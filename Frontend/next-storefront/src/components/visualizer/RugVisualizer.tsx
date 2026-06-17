"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UploadCloud, Image as ImageIcon, Sparkles, CheckCircle2, Download, Search, Lightbulb, Lock } from "lucide-react";
import Image from "next/image";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

// --- Direct imports for images ---
import sampleRoom1 from "@/assets/visualizer/sample-room-1.jpg";
import sampleRoom2 from "@/assets/visualizer/sample-room-2.jpg";
import sampleRoom3 from "@/assets/visualizer/sample-room-3.jpg";
import sampleRoom4 from "@/assets/visualizer/sample-room-4.jpg";
import rugroom from "@/assets/visualizer/rugroom.jpg";
import rugroom2 from "@/assets/visualizer/rugroom2.jpg";
import rugroom3 from "@/assets/visualizer/rugroom3.jpg";
import rugroom4 from "@/assets/visualizer/rugroom4.jpg";
// import rugroom5 from "@/assets/visualizer/rugroom5.jpg";
import rugroom6 from "@/assets/visualizer/rugroom6.jpg";

// --- Helper Components ---
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    className={`bg-[#ffffff] border border-[#e5e7eb] shadow-xl rounded-none p-8 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ icon, title, step }: { icon: React.ReactNode; title: string; step: string }) => (
  <div className="flex items-center mb-6 pb-4 border-b border-[#F5E1E3]">
    <div className="flex-shrink-0 bg-[#7A0C13] text-white rounded-full h-8 w-8 flex items-center justify-center font-serif text-sm mr-4 shadow-sm">{step}</div>
    <div className="flex items-center">
      {icon}
      <h3 className="text-2xl font-serif text-[#171717] ml-3">{title}</h3>
    </div>
  </div>
);

// --- Fun facts for the interactive loading screen ---
const funFacts = [
  "A single Persian rug can have over 1 million hand-tied knots.",
  "Natural dyes from plants and insects give traditional rugs their vibrant, lasting colors.",
  "Some intricate rug patterns can take a skilled weaver several years to complete.",
  "The art of rug making is a tradition passed down through generations, often over thousands of years.",
  "No two handcrafted rugs are ever exactly alike, making each one a unique piece of art."
];

const sampleRooms = [
  { name: 'Living Room', src: sampleRoom1.src, description: "Spacious living area" },
  { name: 'Bedroom', src: sampleRoom2.src, description: "Warm, natural lighting" },
  { name: 'Dining Room', src: sampleRoom3.src, description: "Elegant dining space" },
  { name: 'Modern Hall', src: sampleRoom4.src, description: "Bright, open hallway" },
  { name: 'Classic Nook', src: rugroom.src, description: "A cozy corner" },
  { name: 'Modern Study', src: rugroom2.src, description: "Professional workspace" },
  { name: 'Bright Entry', src: rugroom3.src, description: "Welcoming entryway" },
  { name: 'Minimalist Lounge', src: rugroom4.src, description: "Clean, modern design" },
  { name: 'Sunlit Den', src: rugroom6.src, description: "A bright, airy room" },
];

export default function RugVisualizer() {
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const [roomImagePreview, setRoomImagePreview] = useState<string>('');
  const [selectedRoomName, setSelectedRoomName] = useState<string>('');
  const [rugImage, setRugImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [countdown, setCountdown] = useState(30);

  const searchParams = useSearchParams();
  const router = useRouter();
  const rugUrlFromQuery = searchParams.get('rugUrl');
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  
  useEffect(() => {
    const fetchAndSetRugImage = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const file = new File([blob], "rug_from_store.jpg", { type: blob.type });
        setRugImage(file);
      } catch (error) {
        console.error("Failed to fetch rug image from URL:", error);
        toast.error("Could not load the selected rug image.");
      }
    };
    if (rugUrlFromQuery) {
      fetchAndSetRugImage(rugUrlFromQuery);
    }
  }, [rugUrlFromQuery]);
  
  useEffect(() => {
    let factInterval: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;
    if (isLoading) {
      factInterval = setInterval(() => {
        setFactIndex(prev => (prev + 1) % funFacts.length);
      }, 5000);
      setCountdown(30);
      countdownInterval = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      clearInterval(factInterval);
      clearInterval(countdownInterval);
    };
  }, [isLoading]);

  const handleRoomImageSelect = (file: File) => {
    setRoomImage(file);
    setRoomImagePreview(URL.createObjectURL(file));
    setSelectedRoomName('');
    setPreviewImage(null);
  };

  const handleSampleRoomSelect = async (roomUrl: string, roomName: string) => {
    setSelectedRoomName(roomName);
    setRoomImagePreview(roomUrl);
    setPreviewImage(null);
    try {
      const response = await fetch(roomUrl);
      const blob = await response.blob();
      const file = new File([blob], roomUrl.split('/').pop() || 'room.jpg', { type: blob.type });
      setRoomImage(file);
    } catch (error) {
      toast.error("Could not load sample room.");
    }
  };
  
  const handleRugImageSelect = (file: File) => {
    setRugImage(file);
    setPreviewImage(null);
  };
  
  const handleDownload = async () => {
    if (!previewImage) return;
    try {
      // Fetch the image to create a blob, forcing the browser to download it instead of opening it
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'safina-visualization.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image", err);
      toast.error("Failed to download image.");
    }
  };
  
  const canSubmit = !!(roomImage && rugImage);

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Please select both a room and a rug image.");
      return;
    }
    setIsLoading(true);
    setPreviewImage(null);
    try {
      const formData = new FormData();
      formData.append("room_image", roomImage);
      formData.append("rug_image", rugImage);

      const visualizerUrl = process.env.NEXT_PUBLIC_VISUALIZER_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${visualizerUrl}/place-rug/`, { method: "POST", body: formData });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }
      const data = await response.json();
      const imageUrl = data.image_url;
      setPreviewImage(imageUrl);
      
      // Save visualization to Medusa backend history
      if (user) {
         try {
            const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
            await fetch(`${medusaUrl}/store/visualizations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                },
                body: JSON.stringify({
                    customer_id: user.id,
                    customer_name: user.name,
                    image_url: imageUrl
                })
            });
         } catch(e) {
            console.error("Failed to save visualization to history", e);
         }
      }

      toast.success("Visualization generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const browseOurRugs = () => {
    router.push('/catalog');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] font-sans pt-[130px] pb-20 flex items-center justify-center">
        <motion.div 
          className="bg-[#ffffff] border border-[#e5e7eb] shadow-xl p-12 text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto w-16 h-16 bg-[#F5E1E3] rounded-full flex items-center justify-center mb-6">
            <Lock className="text-[#7A0C13]" size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-serif text-[#171717] mb-4">Members Exclusive</h2>
          <p className="text-[#696969] text-base mb-8 font-light leading-relaxed">
            Please log in or create an account to use our premium AI Rug Visualizer. This allows us to save your beautifully generated room setups for your future reference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/login')} 
              className="bg-[#7A0C13] text-[#ffffff] px-8 py-3 text-sm tracking-widest uppercase font-sans hover:bg-[#171717] transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push('/login?tab=register')} 
              className="bg-transparent text-[#171717] border border-[#171717] px-8 py-3 text-sm tracking-widest uppercase font-sans hover:bg-[#171717] hover:text-[#ffffff] transition-colors"
            >
              Create Account
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans pb-20 pt-[130px]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#171717] mb-4">AI Rug Visualizer</h1>
          <p className="text-[#696969] text-lg max-w-2xl mx-auto font-light">
            Experience our handcrafted rugs in your own space. Upload a photo of your room or choose from our curated galleries to see the magic unfold.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-8">
            <Card>
              <CardHeader icon={<ImageIcon className="text-[#7A0C13]" size={24} />} title="Choose Your Room" step="1" />
              <ImageUploader onImageSelect={handleRoomImageSelect} label="Upload Room Photo" />
              <SampleRoomGallery onRoomSelect={handleSampleRoomSelect} selectedRoomName={selectedRoomName} />
            </Card>
            <Card>
              <CardHeader icon={<Sparkles className="text-[#7A0C13]" size={24} />} title="Select Your Rug" step="2" />
              {rugUrlFromQuery && rugImage ? (
                <div className="text-center p-6 border border-[#F5E1E3] rounded-sm bg-[#ffffff] shadow-sm">
                  <p className="font-serif text-[#7A0C13] text-lg mb-4">Selected from Catalog</p>
                  <img src={URL.createObjectURL(rugImage)} alt="Selected Rug" className="w-full h-48 object-cover rounded-sm shadow-md" />
                  <button onClick={() => setRugImage(null)} className="mt-4 text-sm text-[#696969] underline hover:text-[#171717]">Change Rug</button>
                </div>
              ) : ( 
                <div className="space-y-6">
                    <ImageUploader onImageSelect={handleRugImageSelect} label="Upload Custom Rug" />
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-[#e5e7eb]"></div>
                        <span className="flex-shrink-0 mx-4 text-[#696969] text-sm font-serif italic">or</span>
                        <div className="flex-grow border-t border-[#e5e7eb]"></div>
                    </div>
                    <button 
                      onClick={browseOurRugs} 
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#ffffff] border border-[#7A0C13] text-[#7A0C13] rounded-none hover:bg-[#7A0C13] hover:text-[#ffffff] transition-all duration-300 font-sans tracking-wide uppercase text-sm"
                    >
                        <Search size={18} />
                        Browse Collection
                    </button>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-8 lg:sticky lg:top-24">
            <motion.div 
              className="relative w-full aspect-[4/3] bg-[#ffffff] rounded-none shadow-2xl flex items-center justify-center overflow-hidden border border-[#e5e7eb]"
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              <AnimatePresence>
                {roomImagePreview && !previewImage && (
                  <motion.img key="room-bg" src={roomImagePreview} alt="Selected Room" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                )}
                {previewImage && (
                  <motion.img key="final-preview" src={previewImage} alt="Rug Visualization" className="absolute inset-0 w-full h-full object-cover z-10" initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.8 }} />
                )}
              </AnimatePresence>
              
              {isLoading && (
                <div className="absolute inset-0 bg-[#ffffff]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8">
                  <Loader2 size={40} className="animate-spin text-[#7A0C13]" />
                  <p className="mt-8 text-[#171717] font-serif text-2xl">Crafting your visualization...</p>
                  <p className="text-sm text-[#696969] mt-2 font-sans tracking-wide">
                    Estimated time remaining: <span className="font-semibold text-[#7A0C13]">{countdown}s</span>
                  </p>
                  <div className="mt-12 text-center w-full max-w-md">
                      <div className="flex items-center justify-center gap-2 text-sm font-sans tracking-widest uppercase text-[#8b6d4b] mb-4">
                        <Lightbulb size={16} />
                        <span>Artisan Insight</span>
                      </div>
                      <div className="h-24 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={factIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="text-[#333333] text-lg font-serif italic"
                            >
                                "{funFacts[factIndex]}"
                            </motion.p>
                        </AnimatePresence>
                      </div>
                  </div>
                </div>
              )}

              {!roomImagePreview && !isLoading && (
                <div className="text-center text-[#696969] p-8">
                  <ImageIcon size={48} className="mx-auto mb-6 opacity-20 text-[#171717]" strokeWidth={1} />
                  <h3 className="text-2xl font-serif text-[#171717]">Your Canvas Awaits</h3>
                  <p className="mt-3 font-light">Select a room in Step 1 to begin.</p>
                </div>
              )}
              
              
              {previewImage && !isLoading && (
                <motion.button 
                  onClick={handleDownload} 
                  className="absolute bottom-6 right-6 z-20 bg-[#ffffff] text-[#171717] border border-[#e5e7eb] py-3 px-6 rounded-none hover:bg-[#F5E1E3] hover:border-[#7A0C13] hover:text-[#7A0C13] transition-all shadow-lg flex items-center gap-3 font-sans tracking-wide text-sm uppercase" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                >
                  <Download size={16} /> Save Image
                </motion.button>
              )}
            </motion.div>
            
            <div className="mt-8 flex justify-center">
              <motion.button
                onClick={handleSubmit}
                disabled={!canSubmit || isLoading}
                className="w-full md:w-auto bg-[#7A0C13] text-[#ffffff] font-sans tracking-widest uppercase py-4 px-12 text-sm transition-all duration-300 disabled:bg-[#e5e7eb] disabled:text-[#696969] disabled:cursor-not-allowed flex items-center justify-center shadow-xl hover:bg-[#171717]"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5 }}
              >
                {isLoading ? <Loader2 className="mr-3 animate-spin" size={18} /> : <Sparkles className="mr-3" size={18} />}
                {isLoading ? "Rendering..." : "Visualize Setup"}
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center border-t border-[#e5e7eb] pt-8">
          <p className="text-[#696969] text-sm font-serif italic tracking-wide">
            This is an AI-generated visualization. While we strive for photorealistic accuracy, slight variations in lighting, scale, and placement may occur.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---
const ImageUploader = ({ onImageSelect, label }: { onImageSelect: (file: File) => void, label: string }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="text-center">
      <label className="cursor-pointer w-full border border-dashed border-[#8b6d4b]/50 bg-[#f7f7f7] rounded-none p-8 flex flex-col items-center hover:bg-[#F5E1E3]/20 hover:border-[#7A0C13] transition-colors relative group">
        {preview ? ( 
          <div className="relative w-full">
            <img src={preview} alt="Preview" className="w-full h-32 object-cover shadow-sm" />
            <div className="absolute inset-0 bg-[#000000]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[#ffffff] text-sm font-sans tracking-wide uppercase">Change Image</span>
            </div>
          </div>
        ) : (
          <>
            <UploadCloud className="w-8 h-8 text-[#8b6d4b] mb-4 group-hover:text-[#7A0C13] transition-colors" strokeWidth={1.5} />
            <span className="font-sans tracking-wide text-[#333333] text-sm uppercase group-hover:text-[#7A0C13] transition-colors">{label}</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};

const SampleRoomGallery = ({ onRoomSelect, selectedRoomName }: { onRoomSelect: (url: string, name: string) => void, selectedRoomName: string }) => (
    <div className="mt-8">
        <h4 className="text-sm font-sans tracking-widest text-[#696969] mb-4 uppercase text-center">Or Select a Sample</h4>
        <div className="grid grid-cols-2 gap-3">
            {sampleRooms.slice(0, 4).map((room) => (
                <button 
                  key={room.name} 
                  onClick={() => onRoomSelect(room.src, room.name)} 
                  className={`relative overflow-hidden group border ${selectedRoomName === room.name ? 'border-[#7A0C13]' : 'border-transparent'}`}
                >
                    <img src={room.src} alt={room.name} className="w-full h-24 object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[#000000]/20 group-hover:bg-[#000000]/40 transition-colors"></div>
                    <p className="absolute bottom-2 left-3 right-3 text-xs font-sans tracking-wide text-[#ffffff] text-left leading-tight drop-shadow-md">{room.name}</p>
                    {selectedRoomName === room.name && (
                        <div className="absolute inset-0 bg-[#7A0C13]/80 flex items-center justify-center backdrop-blur-sm">
                            <CheckCircle2 className="w-6 h-6 text-[#ffffff]" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    </div>
);
