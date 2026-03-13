import { createClient } from "@sanity/client";
import fs from "fs";

const client = createClient({
  projectId: "4i9q9ctl",
  dataset: "production",
  apiVersion: "2025-02-19",
  token: "sk3odf7Pqeyy9CAHMPSdba7NrcI0Ogqu0Bch7tsfCTqVsPc0A0nIqrFgpUHPViZXoMFq1Hl7ao2Tzj0mKDK8RoEvTB25Wz6mvEuiifqEhaytNFG8KGkhRID1IXPpyxkoPwynXM3xaV0Be3bYW28lw1YTDCDyNKFSM66pyPK8B2tmeKEganAa",
  useCdn: false,
});

async function publishBlog() {

  const postId = "post-" + Date.now()

  console.log("Uploading main image...")

  const mainImage = await client.assets.upload(
    "image",
    fs.createReadStream("/Users/macbookpro/Documents/Conversly/escalation/client_v2/public/deploy_voice.png")
  )

  console.log("Uploading body image...")

  const bodyImage = await client.assets.upload(
    "image",
    fs.createReadStream("/Users/macbookpro/Documents/Conversly/escalation/client_v2/public/deploy_voice.png")
  )

  console.log("Images uploaded")

  console.log("Creating draft...")

  await client.create({

    _id: `drafts.${postId}`,
    _type: "post",

    title: "How VerlyAI Improves Customer Support Automation",

    slug: {
      _type: "slug",
      current: "verlyai-customer-support-automation-" + Date.now()
    },

    excerpt:
      "Discover how VerlyAI helps businesses automate customer support with AI-powered chatbots.",

    featured: false,

    publishedAt: new Date().toISOString(),

    mainImage: {
      _type: "image",
      alt: "AI chat support improving response time",
      asset: {
        _type: "reference",
        _ref: mainImage._id
      }
    },

    author: {
      _type: "reference",
      _ref: "290948c1-9a04-41a4-9b07-960131320993"
    },

    body: [

      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "AI-powered chat support is transforming how businesses interact with customers."
          }
        ]
      },

      // IMAGE BETWEEN PARAGRAPHS
      {
        _type: "image",
        alt: "VerlyAI support dashboard",
        asset: {
          _type: "reference",
          _ref: bodyImage._id
        }
      },

      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "With VerlyAI, companies can resolve common support queries instantly while allowing human agents to focus on complex issues."
          }
        ]
      }

    ]
  })

  console.log("Draft created")

  console.log("Publishing...")

  await client.action({
    actionType: "sanity.action.document.publish",
    draftId: `drafts.${postId}`,
    publishedId: postId
  })

  console.log("✅ Blog published successfully!")

}

publishBlog()