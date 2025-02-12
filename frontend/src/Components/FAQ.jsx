import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    question: "How can I change my profile name?",
    answer:
      "To change your profile name, go to the 'Edit Profile' page and go to the Accounts section. Click on Edit button, enter your new profile name, and then click 'update' button to update your profile name."
  },
  {
    question: "Why am I seeing a yellow warning and unable to fetch my profile handle?",
    answer: (
      <div>
        If you encounter a yellow warning and are unable to fetch your profile handle, it could be due to one of the following reasons:
        <ul className="list-disc list-inside text-gray-700 dark:text-darkText-500">
          <li>The profile handle entered is incorrect.</li>
          <li>The page is temporarily unavailable.</li>
          <li>Your profile is set to private on the respective platform.</li>
          <li>Please verify your profile handle and check the platform's settings. If the issue persists, try again later.</li>
        </ul>
      </div>
    )
  },
  {
    question: "Which coding platforms are supported?",
    answer:
      "We support Leetcode, GeeksforGeeks, CodeStudio, Interviewbit, Codechef, Codeforces, Atcoder, and Hackerrank, allowing you to track your progress across all these platforms in one place."
  },
  {
    question: "How do I connect my coding profiles from different platforms?",
    answer:
      "After signing up, go to the 'Portfolio Tracker' section and access the setup profile page. Here, you can add your user handles for Leetcode, CodeStudio, GeeksforGeeks, Interviewbit, Codechef, Codeforces, and Hackerrank. Alternatively, you can add or update your profiles later in the 'Edit Profile' section under the 'Platform' section."
  },
  {
    question: "What should I do if I encounter an error connecting my LeetCode profile?",
    answer: (
      <div>
        If you encounter an error while connecting your LeetCode profile, follow these steps:
        <ul className="list-disc list-inside text-gray-700 dark:text-darkText-500">
          <li>1. Go to LeetCode and navigate to Edit Profile.</li>
          <li>2. Under the Privacy section, find the option Display my submission history.</li>
          <li>3. Mark it as 'Yes' and click 'Save'.</li>
          <li>4. Retry fetching your profile on Codolio.</li>
        </ul>
        <p className="text-gray-700 dark:text-darkText-500">
          If the issue persists, please contact our support team at support@codolio.com for further assistance.
        </p>
      </div>
    )
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold leading-10 tracking-tight text-center text-white dark:text-white md:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h2>

      <div className="mx-auto mt-10 space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="pb-4 border-b border-gray-300">
            <div
              onClick={() => toggleAnswer(index)}
              className="flex items-center justify-between p-2 font-medium cursor-pointer sm:text-lg"
            >
              <span className="font-[500] text-white">{faq.question}</span>
              {openIndex === index ? (
                <FiChevronUp size={20} className="text-white dark:text-white" />
              ) : (
                <FiChevronDown size={20} className="text-white dark:text-white" />
              )}
            </div>
            {openIndex === index && (
              <div className="px-2 overflow-hidden dark:text-darkText-500">
                <p className="p-2 text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end max-w-4xl mx-auto">
        <a href="/faq" className="block mt-4 text-center text-white underline">
          more
        </a>
      </div>
    </div>
  );
};

export default FAQ;
