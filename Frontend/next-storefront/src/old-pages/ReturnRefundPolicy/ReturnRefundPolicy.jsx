"use client";
import React, { useEffect } from 'react';

const ReturnRefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[12vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Return & Refund Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> November 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Safina Carpets Traders, we want you to be completely satisfied with your purchase. 
                This Return & Refund Policy outlines the conditions under which returns and refunds are accepted, 
                ensuring a fair and transparent process for all our customers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Return & Exchange Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Eligible Items</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Customers may request a return or exchange within 14 days of receiving their order.</li>
                    <li>Returns and exchanges are only applicable to non-custom and non-personalized rugs.</li>
                    <li>Customers must share an image of the packed product to initiate the return request.</li>
                    <li>All returns are subject to a quality inspection before approval.</li>
                    <li>Exchanges will only be processed after the returned product passes Quality Control & Check.</li>
                    <li>Customers may exchange for another product of equal or higher value (paying the difference).Exchanges for lower-value &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;items will not be eligible for partial refunds.</li>
                    <li>Exchanges for lower-value items will not be eligible for partial refunds.</li>


                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Non-Eligible Items</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Custom-made or personalized rugs and carpets</li>
                    {/* <li>Handcrafted items (due to their unique nature)</li> */}
                    <li>Items damaged by customer use or negligence</li>
                    <li>Products returned after 30 days from delivery</li>
                    {/* <li>Items without original packaging or tags</li> */}
                    <li>Rugs that have been cut, trimmed, or altered in any way</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Return Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Fill out the Return Form</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Before returning any item, You will need to fill out the Return Form available on our website:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Details: Please provide as much information as possible about the item, including its condition, any damage, and any &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special instructions with images.</li>
                    <li>Submission: Submit the return form.</li>
                    <li>Approval: Returns will be approved within 24 hours after Submission. We will notify you via email once your return request &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;has been processed.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Return Authorization</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team will provide you with a Return Merchandise Authorization (RMA) number 
                    and detailed return instructions after approval. Returns without RMA numbers will not be accepted.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Package and Ship</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Pack the item securely.</li>
                    <li>Include all original tags, labels, and accessories</li>
                    <li>Attach the RMA number clearly on the package</li>
                    <li>Use a trackable shipping method</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Payment Policy & Accepted Payment Methods</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Safina Carpets accepts payments via:</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Major Credit/Debit Cards (Visa, MasterCard, American Express, Rupay)</li>
                    <li>UPI & Wallet Payments (Google Pay, Paytm, PhonePe)</li>
                    <li>PayPal & Stripe (for international orders)</li>
                    <li>Bank Wire Transfer (for bulk and B2B orders)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Additional Payment Terms:</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Customers opting for installment payments (EMI, Klarna, Afterpay) will be subject to the terms of the respective provider.</li>
                    <li>Payments must be settled in full before dispatch, except for approved corporate accounts, where payment terms may &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be discussed.</li>
                    <li>If the payment was made via UPI, Wallet Payments (Google Pay, Paytm, PhonePe), or Bank Transfer, customers must provide &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;their bank details for refunds.</li>
                    {/* <li>Bank Wire Transfer (for bulk and B2B orders)</li> */}
                  </ul>
                </div>
              </div>
            </section>

            

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Return Shipping & International Orders</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Costs</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Customer is responsible for return shipping costs unless the item was defective or incorrectly shipped</li>
                    <li>We recommend using insured shipping for valuable items</li>
                    <li>Safina Carpets is not responsible for items lost or damaged during return shipping</li>
                    <li>International refunds may take 7-21 business days, depending on banking institutions and exchange rates.</li>
                    <li>Refunds for international orders will be issued in the original currency, but any foreign transaction fees charged by the &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bank are the responsibility of the customer.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Return Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 font-medium">Safina Carpets Traders</p>
                    <p className="text-gray-700">Returns Department</p>
                    <p className="text-gray-700">2592 S. Beverly St, Suite 130</p>
                    <p className="text-gray-700">Boise, ID 83709</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Refund Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Method</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Refunds will be processed using the original payment method:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Credit card refunds: 5-10 business days</li>
                    <li>PayPal refunds: 3-5 business days</li>
                    <li>Bank transfers: 7-10 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Amount</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Full purchase price (excluding original shipping costs)</li>
                    <li>Return shipping costs are not refundable unless item was defective</li>
                    <li>Any applicable taxes will be refunded as per local regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Chargeback & Fraud Protection</h2>
              <div className="space-y-4">
                <div>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>All transactions are verified via secure payment gateways to prevent fraudulent activities.</li>
                    <li>Customers initiating unauthorized chargebacks may be permanently banned from purchasing at Safina Carpets.</li>
                    <li>Bank transfers: 7-10 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">If fraud is suspected, Safina Carpets reserves the right to:</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Hold shipments until payment verification is completed.</li>
                    <li>Request additional identification (in case of high-value transactions).</li>
                    <li>Report fraudulent transactions to relevant authorities.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Import Duties,Taxes,Digital Invoicing & GST Compliance</h2>
              <div className="space-y-4">
                <div>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Safina Carpets will cover any applicable import duties, customs fees, and taxes for international customers.</li>
                    <li>Safina Carpets provides a GST-compliant invoice for all domestic orders.</li>
                    <li>Digital invoices will be sent via email upon product shipment.</li>
                    <li>No hidden fees or additional charges apply.</li>
                  </ul>
                </div>
              </div>
            </section>

             <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. . Warranty & Care Policy</h2>
              <div className="space-y-4">
                <div>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Handmade rugs are covered under a limited warranty of up to 24 months against manufacturing defects.</li>
                    <li>Customers should refer to Safina Carpets' Care & Maintenance Guide for best cleaning practices.</li>
                    {/* <li>Bank transfers: 7-10 business days</li> */}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Warranty coverage does not include:</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Normal wear and tear</li>
                    <li>Shedding or sprouting</li>
                    <li>Color fading due to sun exposure</li>
                    <li>Excessive moisture damage</li>
                    <li>Damage due to heavy furniture</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Damaged or Defective Items</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Immediate Action Required</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    If you receive a damaged or defective item:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Contact us within 48 hours of delivery</li>
                    <li>Provide photos of the damage or defect</li>
                    <li>Keep all original packaging</li>
                    <li>Do not attempt to repair the item</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Cancellations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Order Cancellation</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Orders can be cancelled within 24 hours of placement</li>
                    <li>Contact us immediately at safinacarpets@yahoo.com</li>
                    <li>Full refund for cancelled orders</li>
                    <li>Custom orders cannot be cancelled once production begins</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Liability Disclaimer</h2>
              <div className="space-y-4">
                <div>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Once an order has been shipped, Safina Carpets' responsibility for the product extends until it has been successfully &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delivered to the customer.</li>
                    <li>Customers are responsible for inspecting their product upon arrival and filing claims with Safina Carpets if damage occurs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in transit. Safina Carpets will assist in the claims process as per applicable laws.</li>
                    <li>Safina Carpets reserves the right to deny refunds or exchanges if a product is found to be used, soiled, altered, or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;damaged by the customer.</li>
                    <li>In cases of suspected fraudulent claims, Safina Carpets may request additional proof before approving a return.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-2">
                  For questions about returns and refunds, please contact us:
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
                This Return & Refund Policy is subject to change without notice. 
                Please review this policy before making a purchase.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;