"use client";
import React, { useEffect } from 'react';

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[12vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Terms & Conditions
        </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Safina Carpets Traders ("we," "our," or "us"). These Terms and Conditions ("Terms") 
                govern your use of our website and services. By accessing or using our website, you agree to be 
                bound by these Terms. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. About Our Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safina Carpets Traders specializes in premium handwoven and machine-made rugs and carpets, 
                preserving the heritage of Mughal-era artistry. We offer:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Handcrafted and machine-made carpets and rugs</li>
                <li>Custom carpet design and manufacturing services</li>
                <li>Wholesale and retail sales</li>
                <li>International shipping and delivery</li>
                <li>Virtual consultations and appointments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Product Information and Pricing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to provide accurate product descriptions, images, and pricing. However:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Colors may vary slightly due to monitor settings and lighting conditions</li>
                <li>Handmade products may have natural variations in pattern and texture</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to correct pricing errors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Orders and Payment</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Order Processing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Orders are processed within 1-3 business days. Custom orders may require additional time 
                    for manufacturing. We will notify you of any delays.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Methods</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Google Pay. 
                    All payments are processed securely through encrypted channels.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Shipping and Delivery</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Shipping costs are calculated based on destination and product weight</li>
                <li>Delivery times vary by location (typically 5-15 business days)</li>
                <li>International orders may be subject to customs duties and taxes</li>
                <li>We are not responsible for delays caused by customs or shipping carriers</li>
                <li>Risk of loss passes to the buyer upon delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Returns and Refunds</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Return Policy</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    We accept returns within 30 days of delivery, subject to the following conditions:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Items must be in original condition with tags attached</li>
                    <li>Custom-made items are not eligible for return</li>
                    <li>Return shipping costs are the responsibility of the customer</li>
                    <li>Items must be properly packaged to prevent damage</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Process</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Refunds will be processed within 5-10 business days after we receive and inspect the returned item. 
                    Refunds will be issued to the original payment method.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on this website, including designs, patterns, images, and text, is the property of 
                Safina Carpets Traders or our licensors. You may not reproduce, distribute, or use our content 
                without written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Keep your login credentials secure</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, Safina Carpets Traders shall not be liable for any 
                indirect, incidental, special, or consequential damages arising from your use of our products 
                or services. Our total liability shall not exceed the amount paid for the specific product or service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting on our website. Your continued use of our services constitutes acceptance of the 
                modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of 
                the courts in New Delhi, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-2">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> safinacarpets@yahoo.com</p>
                  <p><strong>Phone:</strong> +91 9953662052</p>
                  <p><strong>Business Hours:</strong> Monday-Saturday, 10AM-7PM (IST)</p>
                  <p><strong>Address:</strong> 2592 S. Beverly St, Suite 130, Boise, ID 83709</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                By using our website and services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms & Conditions.
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default TermsConditions;