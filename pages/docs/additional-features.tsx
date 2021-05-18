import React from "react";
import CodeBlock from "../../components/CodeBlock";
import Page from "../../components/Docs/Page";

export default function Doc(props) {
  return (
    <Page
      title="Additional Features"
      text={
        <>
          <p>
            This section describes Exhibit's additional features in more detail.
          </p>
          <h2 className="pt-4">"Add to Exhibit" Button</h2>
          <p>
            If you operate a catalogue system that supports{" "}
            <a href="https://iiif.io">IIIF</a> you can add a button to your site
            that passes IIIF manifests and collections to{" "}
            <a href="https://exhibit.so/exhibits/create">
              exhibit.so/exhibits/create
            </a>
          </p>
          <p>
            This enables users to easily start a new Exhibit using items
            pre-populated from your catalogue.
          </p>
          <p>
            Here is an example of an Add to Exhibit button being used on the
            University of St Andrews catalogue.
          </p>

          <p>
            <a
              href="https://collections.st-andrews.ac.uk/item/mending-salmon-nets-cromarty/130413"
              rel="external noopener noreferrer"
              target="_blank"
            >
              <img alt="fig 13" className="w-full max-h-full" src="/images/docs/Fig13.png" />
            </a>
          </p>

          <p>
            To add the button to your site, copy and paste the following code,
            replacing "&lt;iiif manifest url&gt;" with the url to your IIIF
            manifest/collection.
          </p>

          <CodeBlock
            code={`<a href="https://exhibit.so/exhibits/create?item=<iiif manifest url>" rel="external noopener noreferrer" target="_blank">Add to Exhibit.</a>`}
          />

          <p>Here are some SVG icons you can also use (click to download).</p>

          <div className="p-8 bg-gray-200 rounded">
            <a href="/svg/add-to-exhibit.svg" download>
              <img src="/svg/add-to-exhibit.svg" />
            </a>
            <br />
            <a href="/svg/exhibit-icon.svg" download>
              <img src="/svg/exhibit-icon.svg" />
            </a>
          </div>
        </>
      }
    />
  );
};
