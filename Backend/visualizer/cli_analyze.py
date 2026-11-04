import sys
import json
import os
from room_analyzer import analyze_room_image

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    masks_out_dir = sys.argv[2] if len(sys.argv) > 2 else None
    
    if not os.path.exists(image_path):
        print(json.dumps({"error": f"Image not found: {image_path}"}))
        sys.exit(1)
        
    with open(image_path, "rb") as f:
        result = analyze_room_image(f, base_url="/")
        
    # If a custom output directory is provided for Next.js public directory
    if masks_out_dir and os.path.exists(masks_out_dir):
        import shutil
        mask_file = os.path.basename(result["occlusion_mask_url"])
        debug_file = os.path.basename(result["debug_overlay_url"])
        src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "generated_images")
        
        shutil.copy(os.path.join(src_dir, mask_file), os.path.join(masks_out_dir, mask_file))
        shutil.copy(os.path.join(src_dir, debug_file), os.path.join(masks_out_dir, debug_file))
        
        result["occlusion_mask_url"] = f"/visualizer-masks/{mask_file}"
        result["debug_overlay_url"] = f"/visualizer-masks/{debug_file}"
        
    print(json.dumps(result))

