import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import "@locospec/blueprint-react/styles.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <div className="@container p-10 bg-gray-50 twp">
        <div className="py-12 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              <p>Just some content, Tailwind will work here</p>
              <ul className="p-2 list-none bg-blue-200 @md:bg-red-500 @lg:bg-pink-300">
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
