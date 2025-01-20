import RootHeadline from "../../pages/RootHeadline";

const ArticlePageTemplate = (props: {
  headline1: string;
  headline2: string;
  author: string;
  readingTime: string;
  intro: string;
  sections: Array<{
    title: string;
    content: string | Array<string>;
  }>;
  quote: string;
  conclusion: string;
}) => {
  return (
    <div className="article-container ">
      <div className="max-w-3xl mx-auto rounded-lg p-6 ">
        <RootHeadline firstH1={props.headline1} secondH1={props.headline2} />
        <div className="flex items-center text-sm text-gray-500 mt-4 mb-6 border-b-2 border-black-200 pb-2">
          <span className="mr-4 flex items-center">
            <span className="text-orange-500 font-semibold">
              מאת {props.author}
            </span>
          </span>
          <span className="flex items-center mr-3">{props.readingTime}</span>
        </div>
        <p className="text-lg leading-relaxed text-gray-800 mb-8 ">
          {props.intro}
        </p>
        {props.sections.map((section, index) => (
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
          {props.quote}
        </blockquote>
        <p className="text-lg leading-relaxed text-gray-800 mb-20">
          {props.conclusion}
        </p>
      </div>
    </div>
  );
};

export default ArticlePageTemplate;
