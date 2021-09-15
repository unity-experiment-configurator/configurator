import React from "react";
import Page from "../../components/Docs/Page";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Doc(props) {
  return (
    <Page
      text={`
Getting Started
======================

The Unity Experiment Configurator allows you to conduct and measure user interaction experiments in virtual reality.

To get started, [download the Interaction Lab application](https://github.com/unity-experiment-configurator/InteractionLab/releases/download/v2/InteractionLab.zip). You can find this via the getting started guide.

Next, log in to the website to start creating your own experiment configurations. 

Using a simple form you can specify interaction types and the shapes, colours, sounds, and sizes of target and distractactor objects. Once complete, your experiment can be downloaded as a .config json file. 

Once downloaded, return to the interaction lab application on your machine and place the config file into the InputElements Folder.

Your experiments will be stored online via your user account. 

You can also repurpose existing experiments using the duplicate feature.

Double clicking the interaction lab executable runs the VR experience with your configuration applied.

The VR experience currently supports the Oculus Rift S. 

The results from your VR interaction experiment, including duration, head and hand positions, are automatically recorded inside a .csv file which you can find in the output elements folder.
      `}
    />
  );
}