"use client";
import React, { useEffect } from 'react';

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[12vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Shipping Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Safina Carpets Traders, we are committed to delivering your beautiful rugs and carpets 
                safely and efficiently. This Shipping Policy outlines our shipping methods, delivery times, 
                costs, and procedures to ensure you receive your order in perfect condition.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Shipping Zones</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Domestic Shipping (India)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    We ship to all states and union territories within India:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>All major cities and metropolitan areas</li>
                    <li>Tier 2 and Tier 3 cities</li>
                    <li>Rural areas (subject to courier serviceability)</li>
                    <li>Remote locations (additional charges may apply)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">International Shipping</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    We offer worldwide shipping to over 50 countries including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>United States and Canada</li>
                    <li>United Kingdom and European Union</li>
                    <li>Australia and New Zealand</li>
                    <li>Middle East and Gulf countries</li>
                    <li>Southeast Asia and other regions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Shipping Methods & Delivery Times</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Domestic Shipping (India)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Delivery Time</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Standard Shipping</td>
                          <td className="px-4 py-3 text-sm text-gray-700">5-7 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">₹150-₹500</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Express Shipping</td>
                          <td className="px-4 py-3 text-sm text-gray-700">2-4 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">₹300-₹800</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Premium Delivery</td>
                          <td className="px-4 py-3 text-sm text-gray-700">1-2 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">₹500-₹1200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">International Shipping</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Region</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Delivery Time</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Starting Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">USA & Canada</td>
                          <td className="px-4 py-3 text-sm text-gray-700">7-14 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">$25</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">UK & Europe</td>
                          <td className="px-4 py-3 text-sm text-gray-700">10-18 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">$30</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Australia & NZ</td>
                          <td className="px-4 py-3 text-sm text-gray-700">12-20 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">$35</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Other Countries</td>
                          <td className="px-4 py-3 text-sm text-gray-700">15-25 business days</td>
                          <td className="px-4 py-3 text-sm text-gray-700">$40</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Shipping Costs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Cost Calculation</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Shipping costs are calculated based on:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Product weight and dimensions</li>
                    <li>Delivery destination</li>
                    <li>Shipping method selected</li>
                    <li>Order value and applicable discounts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Free Shipping</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium mb-2">Enjoy Free Shipping on:</p>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      <li>Domestic orders above ₹5,000</li>
                      <li>International orders above $200</li>
                      <li>Bulk orders (5+ items)</li>
                      <li>Premium membership customers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Processing Time</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Standard Items</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>In-stock items: 1-2 business days</li>
                    <li>Machine-made rugs: 2-3 business days</li>
                    <li>Quality inspection and packaging included</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Custom Orders</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Handcrafted rugs: 2-4 weeks</li>
                    <li>Custom designs: 4-8 weeks</li>
                    <li>Personalized items: 1-3 weeks</li>
                    <li>Processing time communicated at order confirmation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Packaging & Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Protective Packaging</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Rugs are carefully rolled and wrapped in protective plastic</li>
                    <li>Fragile items receive additional cushioning</li>
                    <li>Waterproof packaging for international shipments</li>
                    <li>Eco-friendly packaging materials when possible</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Quality Assurance</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Pre-shipment quality inspection</li>
                    <li>Photographic documentation for valuable items</li>
                    <li>Secure packaging to prevent damage during transit</li>
                    <li>Insurance coverage for high-value shipments</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Order Tracking</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Tracking Information</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Tracking number provided within 24 hours of shipment</li>
                    <li>Real-time tracking updates via SMS and email</li>
                    <li>Online tracking portal on our website</li>
                    <li>Customer service support for tracking queries</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Notifications</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Order confirmation and processing updates</li>
                    <li>Shipment dispatch notification</li>
                    <li>Out for delivery alerts</li>
                    <li>Delivery confirmation with recipient details</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Delivery Instructions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Recipient or authorized person must be present</li>
                    <li>Valid ID required for delivery verification</li>
                    <li>Signature required for packages above ₹10,000</li>
                    <li>Safe delivery location if recipient unavailable</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Special Instructions</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Provide specific delivery instructions during checkout</li>
                    <li>Alternative contact numbers for delivery coordination</li>
                    <li>Preferred delivery time slots (where available)</li>
                    <li>Building access codes or security instructions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. International Shipping Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Customs & Duties</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Customs duties and taxes are buyer's responsibility</li>
                    <li>Accurate product declarations for customs clearance</li>
                    <li>Assistance with customs documentation</li>
                    <li>Delays possible due to customs inspection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Restricted Items</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Some countries may have restrictions on:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Certain materials or dyes</li>
                    <li>Animal-derived products</li>
                    <li>Items above specific value thresholds</li>
                    <li>Oversized packages</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Delivery Issues</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Failed Delivery Attempts</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Up to 3 delivery attempts for domestic orders</li>
                    <li>Package held at local facility for 7 days</li>
                    <li>Customer notification for pickup arrangements</li>
                    <li>Return to sender after holding period</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Damaged or Lost Packages</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Report damage within 48 hours of delivery</li>
                    <li>Provide photos of damaged packaging and items</li>
                    <li>Insurance claims processed for covered shipments</li>
                    <li>Replacement or refund as per our return policy</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Shipping Partners</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Domestic Partners</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Blue Dart Express</li>
                    <li>FedEx India</li>
                    <li>Delhivery</li>
                    <li>DTDC Courier</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">International Partners</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>DHL Express</li>
                    <li>FedEx International</li>
                    <li>UPS Worldwide</li>
                    <li>India Post International</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-2">
                  For shipping-related queries, please contact us:
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
                This Shipping Policy is subject to change without notice. 
                Delivery times are estimates and may vary due to unforeseen circumstances.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;