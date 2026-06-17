"use client";
import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[12vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Safina Carpets Traders, we are committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website, make a purchase, or interact with our services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using our website and services, you consent to the practices described in this Privacy Policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    We may collect the following personal information:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely by third-party providers)</li>
                    <li>Account credentials and preferences</li>
                    <li>Communication history and customer service interactions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Operating system and device characteristics</li>
                    <li>Website usage data and navigation patterns</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Referral sources and search terms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Business Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    For business customers, we may also collect:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Company name and business address</li>
                    <li>Tax identification numbers</li>
                    <li>Business license information</li>
                    <li>Purchase history and order patterns</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Primary Uses</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer service and support</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Process payments and prevent fraud</li>
                    <li>Maintain and improve our website and services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Marketing and Communication</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Send promotional emails and newsletters (with your consent)</li>
                    <li>Notify you about new products and special offers</li>
                    <li>Conduct customer surveys and feedback collection</li>
                    <li>Personalize your shopping experience</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Analytics and Improvement</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Analyze website usage and customer behavior</li>
                    <li>Improve our products and services</li>
                    <li>Develop new features and functionality</li>
                    <li>Monitor and prevent security threats</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Service Providers</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    We may share your information with trusted third-party service providers:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Payment processors (PayPal, Stripe, Razorpay)</li>
                    <li>Shipping and logistics companies</li>
                    <li>Email marketing platforms</li>
                    <li>Website hosting and cloud storage providers</li>
                    <li>Customer service platforms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Legal Requirements</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    We may disclose your information when required by law or to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Comply with legal obligations and court orders</li>
                    <li>Protect our rights and property</li>
                    <li>Prevent fraud and ensure security</li>
                    <li>Cooperate with law enforcement agencies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Business Transfers</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your information may be 
                    transferred to the new entity, subject to the same privacy protections.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies and Tracking Technologies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Types of Cookies</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong>Performance Cookies:</strong> Help us analyze website usage</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                    <li><strong>Marketing Cookies:</strong> Used for targeted advertising</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Cookie Management</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    You can control cookies through:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Browser settings and preferences</li>
                    <li>Our cookie consent banner</li>
                    <li>Third-party opt-out tools</li>
                    <li>Privacy settings on your device</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Security Measures</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure payment processing systems</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Data Breach Response</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    In the unlikely event of a data breach:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>We will notify affected users within 72 hours</li>
                    <li>Immediate steps will be taken to secure the breach</li>
                    <li>Relevant authorities will be informed as required</li>
                    <li>We will provide guidance on protective measures</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Privacy Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Access and Control</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Delete your personal information</li>
                    <li>Restrict processing of your data</li>
                    <li>Data portability (receive your data in a structured format)</li>
                    <li>Object to processing for marketing purposes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Marketing Communications</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Unsubscribe from marketing emails at any time</li>
                    <li>Opt-out of SMS marketing messages</li>
                    <li>Update your communication preferences</li>
                    <li>Choose specific types of communications</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Data Retention</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Retention Periods</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Account information: Until account deletion or 3 years of inactivity</li>
                    <li>Order history: 7 years for tax and legal compliance</li>
                    <li>Marketing data: Until you unsubscribe or opt-out</li>
                    <li>Website analytics: 26 months maximum</li>
                    <li>Customer service records: 3 years</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Data Deletion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When data is no longer needed, we securely delete or anonymize it according to 
                    industry best practices and legal requirements.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. International Data Transfers</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Cross-Border Processing</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Your information may be processed in countries other than your own, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>India (our primary operations)</li>
                    <li>United States (cloud services and analytics)</li>
                    <li>European Union (customer service and logistics)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Safeguards</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We ensure appropriate safeguards are in place for international transfers, 
                    including standard contractual clauses and adequacy decisions.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If we become aware that we have 
                collected such information, we will take steps to delete it promptly.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Parents or guardians who believe their child has provided personal information should 
                contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may contain links to third-party websites, social media platforms, or services. 
                We are not responsible for the privacy practices of these external sites. We encourage you 
                to review their privacy policies before providing any personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our website</li>
                <li>Updating the "Last Updated" date at the top of this policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our 
                  data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Privacy Officer</strong></p>
                  <p><strong>Email:</strong> safinacarpets@yahoo.com</p>
                  <p><strong>Phone:</strong> +91 9953662052</p>
                  <p><strong>Business Hours:</strong> Monday-Saturday, 10AM-7PM (IST)</p>
                  <p><strong>Mailing Address:</strong></p>
                  <p>Safina Carpets Traders</p>
                  <p>Privacy Department</p>
                  <p>2592 S. Beverly St, Suite 130</p>
                  <p>Boise, ID 83709</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Privacy Policy is governed by the laws of India and applicable international 
                data protection regulations, including GDPR for European users and CCPA for 
                California residents.
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                By using our services, you acknowledge that you have read and understood this Privacy Policy 
                and agree to the collection, use, and disclosure of your information as described herein.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;