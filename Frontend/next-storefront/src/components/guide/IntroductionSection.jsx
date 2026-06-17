"use client";
import React from "react";

const faqData = [
  {
    question: "What are the shipping charges?",
    answer:
      "We offer free shipping in India on every item purchased through our website.",
  },
  {
    question: "When will my order arrive?",
    answer:
      "We aim to dispatch all orders within 48 business hours. The estimated delivery time may vary product to product and can be delivered the next day or maximum in 10 business days from the time of placing the order. The estimated delivery can be checked on the product detail page.\nDue to high volume of orders during the sale, there might be a delay of 5-7 days in delivery.",
  },
  {
    question: "How do I check the estimated delivery date for any product?",
    answer:
      "Enter your delivery pin code on the product detail page to know the estimated delivery days for it.",
  },
  {
    question: "How will I know whether my order is confirmed?",
    answer:
      "Once the order is successfully placed, you will receive the following notifications via email:-\nEmail order confirmation\nText message order confirmation",
  },
  {
    question: "How can I cancel my order?",
    answer:
      "You can cancel your order by calling us on +91 8000295928 or email us at - shop@jaipurrugs.com. Order cancellation will only be accepted before the shipment has been dispatched.\nOnce the order is cancelled, the refund shall be initiated and it should reflect in your account within 48 business hours through the original mode of payment.",
    hasLinks: true,
    phoneNumber: "+91 8000295928",
    email: "shop@jaipurrugs.com",
  },
  {
    question: "Is there any hidden cost?",
    answer: "Listed Prices are final and inclusive of all duties and taxes",
  },
];

export const IntroductionSection = () => {
  return (
    <section className="absolute w-[1283px] h-[739px] top-[918px] left-[85px] [font-family:'Jost',Helvetica] font-normal text-black text-base tracking-[0.50px] leading-6">
      <div className="tracking-[0.08px]">
        <br />
        <br />
      </div>

      {faqData.map((faq, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl tracking-[0.12px] mb-4">{faq.question}</h3>

          <div className="tracking-[0.08px] mb-4">
            {faq.hasLinks ? (
              <p>
                You can cancel your order by calling us on{" "}
                <a
                  href={`tel:${faq.phoneNumber}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline"
                >
                  {faq.phoneNumber}
                </a>{" "}
                or email us at -{" "}
                <a
                  href={`mailto:${faq.email}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline"
                >
                  {faq.email}
                </a>
                . Order cancellation will only be accepted before the shipment
                has been dispatched.
                <br />
                Once the order is cancelled, the refund shall be initiated and
                it should reflect in your account within 48 business hours
                through the original mode of payment.
              </p>
            ) : (
              faq.answer.split("\n").map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex < faq.answer.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      ))}

      <div className="tracking-[0.08px]">
        <br />
        <br />
      </div>
    </section>
  );
};
