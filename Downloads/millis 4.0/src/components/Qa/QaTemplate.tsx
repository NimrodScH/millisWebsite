
const QaTemplate = (props: {
  answer: {
    sections: Array<{
      title: string;
      content: string | Array<string>;
    }>;
    quote: string;
    conclusion: string;
  };
}) => {
  return (
    <div className="article-container ">
      <div className="max-w-3xl mx-auto rounded-lg p-6 ">
        {props.answer.sections.map((section, index) => (
          <div key={index} className="mb-8 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4  ">
              {section.title}
            </h2>
            {Array.isArray(section.content) ? (
              <ul className="custom-bullet-list space-y-2">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bullet-icon text-orange-500 text-lg mr-2">
                      •
                    </span>
                    <span className="text-gray-700 mr-2">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg leading-relaxed text-gray-700">
                {section.content}
              </p>
            )}
          </div>
        ))}
        <blockquote className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 italic text-orange-700 p-4 rounded-md shadow-sm mb-8">
          {props.answer.quote}
        </blockquote>
        <p className="text-lg leading-relaxed text-gray-800 mb-2">
          {props.answer.conclusion}
        </p>
      </div>
    </div>
  );
};

export default QaTemplate;
