"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import Nav from "@/app/{components}/Nav";
import ThemeToggler from "@/app/{components}/ThemeToggler";

export default function FAQ() {
  const { dark } = useContext(ThemeContext);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "Our platform provides secure bank log and credit card management, along with real-time financial insights, all in one place.",
    },
    {
      question: "How can I launch the app?",
      answer:
        "You can launch the app by clicking on the 'Launch App' button at the top-right corner of the website or in the mobile navigation menu.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use the latest encryption technologies to ensure that your financial data is secure and private.",
    },
    {
      question: "What kind of financial insights do you offer?",
      answer:
        "We provide detailed insights on your transactions, including spending trends, financial reports, and alerts for unusual activities.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via the 'Support' link in the navigation or through our dedicated Telegram support channel.",
    },
  ];

  return (
    <div
      className={`relative h-screen w-screen px-20 py-10 max-[800px]:px-16 max-[500px]:px-10 ${
        dark ? "bg-black" : "bg-zinc-50"
      }`}
    >
      <Nav />
      <ThemeToggler />
      <div
        className={`ml-auto mr-auto mt-20 max-[800px]:mt-24 max-[500px]:mt-28 ${
          dark ? "text-zinc-50" : "text-black"
        }`}
      >
        <h1 className="text-6xl font-bold mb-6 max-[890px]:text-5xl max-[800px]:text-4xl max-[500px]:text-2xl">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6 max-[500px]:text-sm">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-4 rounded-md shadow-md ${
                dark ? "bg-zinc-900 text-zinc-50" : "bg-zinc-100 text-black"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left font-semibold"
              >
                {faq.question}
              </button>
              {openFAQ === index && <p className="mt-4">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
