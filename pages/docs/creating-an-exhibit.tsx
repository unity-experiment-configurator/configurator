import React from "react";
import Alert from "../../components/Alert";
import Page from "../../components/Docs/Page";
import { demoExperiment } from "../../lib/Utils";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Doc(props) {
  return (
    <Page
      title="Creating an Experiment"
      text={
        <>
          <p>
            Go to{" "}
            <a href="https://experiment.so/experiments/create">
              experiment.so/experiments/create
            </a>{" "}
            to create a new Experiment.
          </p>

          <h2>Providing a description</h2>
          <ul>
            <li>Complete the following fields.</li>
            <li>You can amend this information later via the editor.</li>
          </ul>

          <img alt="fig 1" className="w-full max-h-full" src="/images/docs/Fig1.png" />

          <br />
          <br />
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Title</strong> (required)
                </td>
                <td>
                  The title you want to give your Experiment. (Max character count
                  200).
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Author</strong> (required)
                </td>
                <td>
                  The name of the person writing the Experiment. (Max character
                  count 200).
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Description</strong> (required)
                </td>
                <td>
                  A description of the Experiment. (Max character count 1000).
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Rights</strong> (optional)
                </td>
                <td>
                  This is an optional field where you can specify the copyright
                  for your experiment. Please see{" "}
                  <a href="https://creativecommons.org/licenses/">
                    Creative Commons
                  </a>{" "}
                  for more information. (Max character count 200).
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Adding Items</h2>
          <Alert>
            Please note, Experiment does not store user details. We recommend you
            bookmark, or make a note of the URL for your Experiment,{" "}
            <strong>before</strong> you begin adding items. To find out more, go
            to{" "}
            <a href="#save-share-embed">Save, Share, and Embed your Experiment</a>.
          </Alert>
          <ul>
            <li>To add an item click 'Add item'.</li>
          </ul>
          <img alt="fig 5" className="w-full max-h-full" src="/images/docs/Fig5.png" />
          <ul>
            <li>Import IIIF manifests via the 'Add item' window</li>
          </ul>
          <img alt="fig 6" className="w-full max-h-full" src="/images/docs/Fig6.png" />
          <Alert>
            Please note, if you simply want to try Experiment we recommend you try
            our{" "}
            <a href={`/experiments/create?duplicate=${demoExperiment}`}>
              Demo Experiment
            </a>{" "}
            where a number of items have already been added. To find out more
            about how to find IIIF manifests, please see the{" "}
            <a href="/docs/faq">FAQ’s</a>.
          </Alert>
          <ul>
            <li>Once an item is added two further icons are revealed.</li>
            <li>
              <strong>Delete</strong> items if needed.
            </li>
            <li>
              Quickly <strong>copy</strong> an item's manifest for use in other
              Experiments.
            </li>
          </ul>
          <img alt="fig 7" className="w-full max-h-full" src="/images/docs/Fig7.png" />
          <h2>Adding descriptions</h2>
          <ul>
            <li>Zoom to the section of an item you would like to describe.</li>
            <li>Use the text panel to write a description.</li>
          </ul>
          <img alt="fig 8" className="w-full max-h-full" src="/images/docs/Fig8.png" />
          <ul>
            <li>When complete, click the '+' button.</li>
          </ul>
          <img alt="fig 9" className="w-full max-h-full" src="/images/docs/Fig9.png" />
          <ul>
            <li>A new description panel will appear </li>
            <li>
              You can continue to describe different views of the same item.
            </li>
            <li>
              Descriptions can be edited at any time by clicking on the
              description panels.
            </li>
            <li>Description panels can be reordered using drag and drop.</li>
          </ul>
          <img alt="fig 10" className="w-full max-h-full" src="/images/docs/Fig10.png" />
          <ul>
            <li>Click 'Add item' to import/add additional items.</li>
          </ul>
          <video className="w-full max-h-full" loop autoPlay src="/images/docs/Fig11.mp4" />
          <ul>
            <li>
              Experiments can be previewed at any time using the ‘Preview’ button.
            </li>
          </ul>
          <img alt="fig 12" className="w-full max-h-full" src="/images/docs/Fig12.png" />
          <h2 id="save-share-embed">Save, share, and embed your Experiment</h2>
          <ul>
            <li>A unique url is generated for each Experiment.</li>
            <li>You can find the url under ‘share’ in the Experiment Editor.</li>
          </ul>
          <img alt="fig 2" className="w-full max-h-full" src="/images/docs/Fig2.png" />
          <ul>
            <li>
              The share panel provides options for user access and embedding.
            </li>
            <li>
              You can choose to give edit or view access when sharing a url.
            </li>
          </ul>
          <img alt="fig 3" className="w-full max-h-full" src="/images/docs/Fig3.png" />
          <Alert>
            Please note, a different url is generated when selecting either
            ‘edit’ or ‘view’ options. Ensure you save the <strong>edit</strong>{" "}
            url so you can edit your Experiment in future.
          </Alert>
          <ul>
            <li>
              Experiments can be embedded into other websites at a variety of
              sizes.
            </li>
          </ul>
          <img alt="fig 4" className="w-full max-h-full" src="/images/docs/Fig4.png" />
        </>
      }
    />
  );
}