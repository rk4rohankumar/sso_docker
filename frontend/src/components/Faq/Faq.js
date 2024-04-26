import React from "react";

const FaqCard = ({ question, answer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  );
};

const FAQPage = () => {
  // Dummy FAQ data
  const faqs = [
    {
      question: "What is Local Mama?",
      answer:
        "Local Mama is a platform for local businesses to connect with their customers and offer rewards for their loyalty.",
    },
    {
      question: "How can I join Local Mama?",
      answer:
        "You can join Local Mama by signing up on our website or mobile app.",
    },
    {
      question: "How do I earn rewards?",
      answer:
        "You can earn rewards by making purchases at participating local businesses. Each purchase earns you points, which can be redeemed for rewards.",
    },
    {
      question: "How do I redeem rewards?",
      answer:
        "You can redeem rewards through the Local Mama website or mobile app. Simply navigate to the rewards section and choose the reward you want to redeem.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((faq, index) => (
          <FaqCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      {/* Contact Us section */}
      <div className="mt-8 border-t border-gray-300 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          If you have any further questions or need assistance, please feel free
          to contact us at{" "}
          <a
            href="mailto:localmama4@gmail.com"
            className="text-blue-500 hover:underline"
          >
            localmama4@gmial.com
          </a>{" "}
          or{" "}
          <a
            href="https://wa.me/919392443246"
            className="text-green-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 9392443246
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
