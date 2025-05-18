import { GoogleGenAI } from "@google/genai";
const PROMPT = `
Generate Learning Course depends on following details. In which Make sure to add course name, description, Chapter Name, image prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons , and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette ( blues, purple, oranges) with a clean, professional look. The illustration should feel creative , tech savvy and and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format, Topic under each chapters, Duration for each chapters etc, in JSON format only
Schema:
{
“course”:{
“title”:”string”,
“description”:”string”,
“chapters”:”number”,
“category”:”string”,
“isVideoIncluded”:”boolean”,
“difficulty_level”:”string”,
“duration”:”number”,
“chapters”:[{
	“chapterName”:”string”,
            “duration”:”number”,
“topics”:[“string”],
“imagePrompt”:”string”
}],
}
},
User Input : Reactjs , 3 chapters
`
export async function POST(req) {
  const formData = await req.json();
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.5-pro-preview-05-06";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT+JSON.stringify(formData),
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `The user wants a JSON output representing a learning course.
The course details are:
- Topic: Reactjs
- Number of chapters: 3

I need to:
1.  **Define the overall course structure** based on the schema.
2.  **Populate course-level fields**:
    *   \`title\`: Something like "Mastering ReactJS: A Comprehensive Guide" or "ReactJS Fundamentals".
    *   \`description\`: A brief overview of what ReactJS is and what the course covers.
    *   \`chapters\`: User input (3).
    *   \`category\`: "Web Development" or "Frontend Development".
    *   \`isVideoIncluded\`: Let's assume \`true\` for a modern course.
    *   \`difficulty_level\`: "Beginner to Intermediate".
    *   \`duration\`: Sum of chapter durations.
3.  **Populate chapter-level fields** for each of the 3 chapters:
    *   \`chapterName\`: Needs to be relevant to ReactJS progression (e.g., Introduction, Components, State & Props, Hooks, etc.).
    *   \`duration\`: Estimate a reasonable duration for each chapter (e.g., 2-4 hours).
    *   \`topics\`: List specific sub-topics covered in that chapter.
    *   \`imagePrompt\`: This needs to be specific for each chapter, but based on the general template provided by the user. The core template is: "Create a modern, flat-style 2D digital illustration representing [Chapter Specific Topic/Concept]. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to [Chapter Specific Course Elements, e.g., React logos, component diagrams, code snippets], like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this ReactJS chapter."

Let's break down the chapters for ReactJS:

**Chapter 1: Introduction to ReactJS**
*   Topics: What is React?, Setting up the Environment, JSX, Your First React Component, Understanding the Virtual DOM.
*   Duration: ~2 hours.
*   ImagePrompt focus: "Introduction to ReactJS concepts", "React logos", "code editor setup".

**Chapter 2: Core Concepts: Components, Props, and State**
*   Topics: Functional vs. Class Components, Props and Data Flow, State Management (useState), Handling Events, Conditional Rendering, Lists and Keys.
*   Duration: ~3 hours.
*   ImagePrompt focus: "React components and their interaction", "data flow diagrams (props)", "state management visuals".

**Chapter 3: Advanced React: Hooks, Context API, and Routing**
*   Topics: Introduction to Hooks (useEffect, useContext), Custom Hooks, Context API for Global State, React Router for Navigation, Basic Forms and Controlled Components.
*   Duration: ~3 hours.
*   ImagePrompt focus: "React Hooks", "Context API flow", "routing diagrams".

Total course duration: 2 + 3 + 3 = 8 hours.

Now, let's refine the image prompts.
The user requested a "Course Banner in 3D format" for the *course itself*, but the schema has \`imagePrompt\` under *each chapter*. I will provide chapter-specific image prompts and a general one for the course that can be adapted for a banner. The user also requested the chapter image prompt to be "in 3D format". The provided prompt template is for a "2D digital illustration". I will stick to the user's provided 2D template for chapter image prompts, as it's more detailed and fits the schema location. If they meant a 3D *style* for the 2D illustration, that's subtly different. I'll interpret "image prompt (...) for Course Banner in 3D format" as a general prompt for the course, and the chapter image prompts as per the detailed 2D template in the schema.

Let's assume the user meant the provided image prompt template applies to *each chapter's image*. I will adapt it for each chapter.

Re-reading: "Make sure to add course name, description, Chapter Name, image prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons , and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette ( blues, purple, oranges) with a clean, professional look. The illustration should feel creative , tech savvy and and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format".

This is a bit ambiguous. Is the *long prompt* specifically for the *Course Banner* and should be 3D? Or is it a template for chapter images?
The schema has \`imagePrompt\` inside \`chapters\` array.
"image prompt (...) for Course Banner in 3D format" is stated separately.
However, the schema only defines \`imagePrompt\` within \`chapters\`.

Let's assume the long prompt is a *template* for chapter images, and I should adapt it.
And for the course banner, I will create a separate prompt, perhaps in a slightly different style if "3D format" is emphasized.

Given the schema, \`imagePrompt\` is only at the chapter level. So I must put the generated image prompts there. I will adapt the user's provided detailed prompt for each chapter. I will ignore the "Course Banner in 3D format" part for now as it doesn't fit the schema given for JSON output. Or, I can add a *course-level* \`bannerImagePrompt\` if I slightly extend the schema, but the user explicitly provided the schema.

Let's stick to the provided schema strictly. The prompt provided ("Create a modern, flat-style 2D digital illustration...") will be used for each chapter's \`imagePrompt\`.

Let's draft the JSON structure.

\`\`\`json
{
  "course": {
    "title": "string",
    "description": "string",
    "chapters": "number", // This should be \`numberOfChapters\` or similar, the \`chapters\` array is below
    "category": "string",
    "isVideoIncluded": "boolean",
    "difficulty_level": "string",
    "duration": "number", // total duration in hours
    "chapters": [{ // This is the array of chapters
      "chapterName": "string",
      "duration": "number", // duration in hours for this chapter
      "topics": ["string"],
      "imagePrompt": "string"
    }]
  }
}
\`\`\`
The schema has \`chapters\` (number) and \`chapters\` (array). This is a common mistake. I'll assume the first \`chapters\` is actually \`numberOfChapters\` or similar, and the second one is the array. Given the context, the top-level \`chapters\` likely refers to the *count* of chapters. Let's call it \`numberOfChapters\` in my mind, but output \`chapters\` as per schema if it's a number. Ok, the user schema example literally has \`chapters: "number"\` and then \`chapters: [{...}]\`. This is likely an error in their schema definition. I will assume \`chapters\` (the number) is the total count of chapters.

Let's proceed with the user-provided schema as is, even with the duplicate key \`chapters\`. A valid JSON cannot have duplicate keys at the same level. I'll interpret the first "chapters":"number" as \`total_chapters_count\` and the second "chapters":[{...}] as the actual chapter list. When generating the JSON, I will have to pick one. Standard JSON parsers will likely take the last definition. So I should probably just use the array for \`chapters\`. Or, if the intention was to have a count, I'll name it distinctively or ask for clarification. Given the instruction "Generate Learning Course depends on following details... in JSON format only Schema: ...", I should try to adhere.

Let's assume the first \`chapters: "number"\` is the *intended number of chapters* to generate, which is 3 from user input. And the second \`chapters: [{...}]\` is the *actual array of chapter objects*. This means the final JSON will only have one \`chapters\` key, which will be the array of chapter objects. The number 3 is an input to *generate* that many chapters.

Okay, let's generate.

Course Details:
*   Name: "ReactJS: From Fundamentals to Modern Development"
*   Description: "Dive into ReactJS, the popular JavaScript library for building user interfaces. This course covers core concepts, state management, hooks, routing, and best practices to build dynamic and responsive web applications."
*   Number of Chapters (user input): 3
*   Category: "Web Development"
*   isVideoIncluded: \`true\`
*   Difficulty Level: "Beginner to Intermediate"
*   Total Duration: (Will calculate from chapters)

Chapter 1:
*   Name: "Getting Started with ReactJS"
*   Duration: 2 (hours)
*   Topics:
    *   "Introduction to ReactJS and its Core Philosophy"
    *   "Setting Up Your Development Environment (Node.js, npm/yarn, Create React App)"
    *   "Understanding JSX Syntax and its Benefits"
    *   "Creating Your First React Component (Functional Components)"
    *   "Rendering Elements and Introduction to the Virtual DOM"
*   Image Prompt: "Create a modern, flat-style 2D digital illustration representing an introduction to ReactJS. Include UI/UX elements like a simplified code editor screen showing a basic React component, icons for Node.js, npm, and the React logo. Add symbolic elements like a blueprint for a UI, sticky notes with keywords like 'JSX', 'Components', and visual aids like a simple diagram of the Virtual DOM. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing foundational ReactJS concepts."

Chapter 2:
*   Name: "React Components, Props, and State"
*   Duration: 3 (hours)
*   Topics:
    *   "Deep Dive into Functional Components"
    *   "Understanding Props: Passing Data to Components"
    *   "Managing Component State with the \`useState\` Hook"
    *   "Handling Events in React"
    *   "Conditional Rendering: Showing/Hiding Elements"
    *   "Rendering Lists and Using Keys Effectively"
*   Image Prompt: "Create a modern, flat-style 2D digital illustration representing React components, props, and state. Include UI/UX elements like mockup screens showing nested components, text blocks explaining props drilling, and icons for state updates. Add symbolic elements related to React, like interconnected component blocks, arrows indicating data flow (props), a visual representation of a state variable changing, and sticky notes with 'Props', 'useState', 'Events'. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing core React component architecture."

Chapter 3:
*   Name: "Advanced React: Hooks, Context API, and Basic Routing"
*   Duration: 3 (hours)
*   Topics:
    *   "Exploring More React Hooks: \`useEffect\` for Side Effects"
    *   "Introduction to the Context API for Global State Management"
    *   "Building Reusable Logic with Custom Hooks"
    *   "Client-Side Routing with React Router (Basic Setup: Route, Link, Switch)"
    *   "Handling Forms and Controlled Components in React"
*   Image Prompt: "Create a modern, flat-style 2D digital illustration representing advanced React concepts like Hooks, Context API, and Routing. Include UI/UX elements such as mockup screens of a multi-page application, icons symbolizing hooks (e.g., a hook shape), and data flow for Context API. Add symbolic elements related to React, like a network diagram for React Router, a visual metaphor for Context providing global state, code snippets for \`useEffect\` or \`useContext\`, and sticky notes with 'useEffect', 'Context', 'Router'. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing advanced React features."

Total Course Duration: 2 + 3 + 3 = 8 hours.

Double-check the schema and requirements.
Schema provided:
\`\`\`json
{
  "course":{
    "title":"string",
    "description":"string",
    "chapters":"number", // This is the problematic one. I'll use it as the count of chapters.
    "category":"string",
    "isVideoIncluded":"boolean",
    "difficulty_level":"string",
    "duration":"number", // total duration
    "chapters":[{ // This is the array of chapter details
        "chapterName":"string",
        "duration":"number", // duration for chapter
        "topics":["string"],
        "imagePrompt":"string"
    }]
  }
}
\`\`\`
If I strictly follow this schema, I'll have two keys named \`chapters\`. This is invalid JSON.
"A JSON object is an unordered collection of key/value pairs. A JSON object begins with { (left brace) and ends with } (right brace). Each key is followed by : (colon) and key/value pairs are separated by , (comma)."
"Keys must be strings, and values must be a valid JSON data type (string, number, object, array, boolean or null)."
"Keys should be unique within an object." (This is a strong convention, and many parsers enforce it or take the last value).

Given the user provided "User Input : Reactjs , 3 chapters", the "3 chapters" part seems to correspond to the \`"chapters":"number"\` field. And then the detailed chapter list would be the array.

I have two options:
1.  Produce invalid JSON as per the literal (but flawed) schema. (Bad idea)
2.  Interpret the schema to be valid: assume the first \`chapters\` (number) means \`numberOfChapters\` or something similar, and the second \`chapters\` (array) is the actual list of chapters. Then choose one name.
    *   If I use \`numberOfChapters\` for the count, and \`chapters\` for the array, this would be logical. But the user gave a specific schema.
    *   If I only use \`chapters\` for the array, then the count (3) is implicitly the length of this array. This is the most common and correct way. The numeric \`chapters\` field would then be redundant.

Let's assume the user wants the *count* of chapters explicitly stated *and* the list of chapters. This implies the schema they provided has a typo and should have had distinct names, e.g., \`chapterCount\` and \`chapterList\`.
Since I must adhere to the schema names, and a JSON object cannot have duplicate keys, I will use the *last occurrence* rule that many parsers follow. This means the \`chapters\` array will overwrite the \`chapters\` number.
This interpretation makes the \`chapters: "number"\` field in their schema definition effectively ignored if the array part is also named \`chapters\`.

Alternatively, the schema is for *documentation* and the user wants me to *fill in* values where \`chapters\` means the count, and the array is the details.
Let's generate the JSON with \`chapters\` as the count, and then the array of chapters as \`chapterDetails\` (or similar) if I have to make it valid.
OR, I can ask the user to clarify their schema because it has duplicate keys. Since I can't ask, I'll make a best guess.

Best guess: The \`chapters\` field (number) should be the count, and the \`chapters\` array should contain the chapter objects. JSON standard dictates keys are unique. If I output:
\`\`\`json
{
  "course": {
    "title": "ReactJS: From Fundamentals to Modern Development",
    "description": "...",
    "chapters": 3, // The count
    "category": "Web Development",
    "isVideoIncluded": true,
    "difficulty_level": "Beginner to Intermediate",
    "duration": 8,
    "chapters_list": [ // Renamed to make it valid, if I have to make it valid.
      { ... },
      { ... },
      { ... }
    ]
  }
}
\`\`\`
But the user explicitly provided the schema \`chapters:[{...}]\`.

What if the schema is intended to be like this:
\`\`\`json
{
  "course": {
    "title": "string",
    "description": "string",
    // "chapters_count": "number", // Example: this is what it SHOULD be
    "category": "string",
    "isVideoIncluded": "boolean",
    "difficulty_level": "string",
    "duration": "number",
    "chapters": [ // This is the array of chapters, its length is the count.
      {
        "chapterName": "string",
        "duration": "number",
        "topics": ["string"],
        "imagePrompt": "string"
      }
    ]
  }
}
\`\`\`
In this case, the \`chapters: "number"\` line in the schema description is perhaps a note about the *input* "3 chapters", not a field in the output JSON object \`course\`. This seems more plausible. The schema describes the structure of the \`course\` object. The \`course\` object would then have a \`chapters\` property which is an array. The number of chapters is implicitly \`chapters.length\`.

Let's re-read the request carefully: "Generate Learning Course depends on following details. In which Make sure to add course name, description, Chapter Name, image prompt (...) for Course Banner in 3D format, Topic under each chapters, Duration for each chapters etc, in JSON format only. Schema: { 'course':{ 'title':'string', 'description':'string', 'chapters':'number', ... 'chapters':[{...}] } } User Input : Reactjs , 3 chapters".

The user input "3 chapters" is a constraint for generation.
The schema describes the output.
A schema with duplicate keys is problematic. Most JSON libraries will take the *last* defined key. So, \`chapters\` will be an array.
This means the \`chapters: "number"\` line in the schema definition is effectively overridden or ignored by the \`chapters: [{...}]\` line.
So, the output JSON will have \`chapters\` as an array. The count (3) will be the length of this array. This is the cleanest and most standard way.

What about the "image prompt (...) for Course Banner in 3D format"? The schema for \`course\` does not have a field for a course banner image prompt. It only has \`imagePrompt\` inside each chapter. I will stick to the schema and only provide \`imagePrompt\` for chapters. The detailed prompt given by the user will be adapted for each chapter. I will ignore the "3D format" and "Course Banner" parts as they don't fit the provided output schema for the JSON. Or rather, I will use the *content* of the provided prompt for the *chapter* images, as that's where \`imagePrompt\` is defined in the schema.

So, the structure will be:
\`\`\`json
{
  "course": {
    "title": "...",
    "description": "...",
    // No 'chapters' count field here, as the array will be named 'chapters'.
    "category": "...",
    "isVideoIncluded": true,
    "difficulty_level": "...",
    "duration": 8, // Total duration
    "chapters": [ // This is the array of chapter objects
      {
        "chapterName": "Chapter 1 Name",
        "duration": 2, // Chapter 1 duration
        "topics": ["Topic 1.1", "Topic 1.2"],
        "imagePrompt": "Chapter 1 image prompt adapted from user template"
      },
      {
        "chapterName": "Chapter 2 Name",
        "duration": 3, // Chapter 2 duration
        "topics": ["Topic 2.1", "Topic 2.2"],
        "imagePrompt": "Chapter 2 image prompt adapted from user template"
      },
      {
        "chapterName": "Chapter 3 Name",
        "duration": 3, // Chapter 3 duration
        "topics": ["Topic 3.1", "Topic 3.2"],
        "imagePrompt": "Chapter 3 image prompt adapted from user template"
      }
    ]
  }
}
\`\`\`
This looks like a correct interpretation. The \`chapters\` field in the JSON will be an array of 3 chapter objects.

The image prompt user provided: "Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons , and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette ( blues, purple, oranges) with a clean, professional look. The illustration should feel creative , tech savvy and and educational, ideal for visualizing concepts in user Course".
I need to replace "user Topic" and "user Course" with relevant terms for each chapter.
For Chapter 1: "user Topic" -> "an introduction to ReactJS". "user Course" -> "ReactJS".
For Chapter 2: "user Topic" -> "React components, props, and state". "user Course" -> "ReactJS".
For Chapter 3: "user Topic" -> "advanced React concepts like Hooks, Context API, and Routing". "user Course" -> "ReactJS".

This seems complete and consistent with the request and a valid interpretation of the schema.
Final check on constraints:
- JSON format only: Yes.
- Course name, description, Chapter Name: Yes.
- image prompt (using template) for chapters: Yes.
- Topic under each chapters: Yes.
- Duration for each chapters: Yes.
- User Input: Reactjs, 3 chapters: Yes, content is about ReactJS and there are 3 chapters.

The schema also mentions \`chapters: "number"\` at the top level of the course object. If I *must* include this, and also the array \`chapters\`, then this is a problem.
However, if the schema is an *example* of fields and their types, like documentation, they might list \`chapters\` once as a number (like a parameter you might pass in) and then \`chapters\` again to describe its structure if it's an array of objects.
If this were a GraphQL schema or something similar, this might be a union type or an error. For JSON, it's an error.
I'll go with the interpretation that the JSON object should have one key named \`chapters\` and it should be an array of chapter objects. The length of this array will represent the number of chapters. This is standard practice.

Let's consider the possibility that the user wants *both* a numeric chapter count *and* a list of chapters. In some systems, this might be:
\`\`\`json
{
  "course": {
    "chapter_count": 3, // or "chapters_total"
    "chapters": [ /* array of chapters */ ]
  }
}
\`\`\`
But the schema explicitly says \`"chapters":"number"\` and then \`"chapters":"[{...}]"\`.
If the tool generating this simply reads the schema line by line and creates fields, it might indeed try to create two fields with the same name. This is not good.
I will assume the more common interpretation: \`chapters\` is an array, and its length is the count.
This means I will *not* have a separate \`chapters: 3\` field in the JSON.

Let's refine the prompts one last time.
User's template: "Create a modern, flat-style 2D digital illustration representing **user Topic**. Include UI/UX elements such as mockup screens, text blocks, icons, buttons , and creative workspace tools. Add symbolic elements related to **user Course**, like sticky notes, design components, and visual aids. Use a vibrant color palette ( blues, purple, oranges) with a clean, professional look. The illustration should feel creative , tech savvy and and educational, ideal for visualizing concepts in **user Course**)"

Chapter 1 Image Prompt: "Create a modern, flat-style 2D digital illustration representing **an introduction to ReactJS and its foundational concepts**. Include UI/UX elements such as mockup screens displaying simple React code, text blocks with key terms, icons for development tools (Node, npm, React logo), and buttons for code execution. Add symbolic elements related to **ReactJS fundamentals**, like sticky notes with 'JSX', 'Component', 'Virtual DOM', design components like basic UI wireframes, and visual aids such as a simplified diagram of the Virtual DOM. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this **ReactJS course chapter**."

Chapter 2 Image Prompt: "Create a modern, flat-style 2D digital illustration representing **React components, props, and state management**. Include UI/UX elements such as mockup screens showing component hierarchies, text blocks explaining data flow, icons for state and props, and interactive buttons. Add symbolic elements related to **core ReactJS concepts**, like sticky notes with 'Props', 'State', 'Events', design components illustrating parent-child component relationships, and visual aids like flowcharts for props drilling and state updates. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this **ReactJS course chapter**."

Chapter 3 Image Prompt: "Create a modern, flat-style 2D digital illustration representing **advanced ReactJS features like Hooks, Context API, and client-side routing**. Include UI/UX elements such as mockup screens of a complex single-page application, text blocks detailing hook syntaxes, icons for various hooks (e.g., \`useState\`, \`useEffect\`, \`useContext\`) and routing symbols. Add symbolic elements related to **advanced ReactJS development**, like sticky notes with 'Hooks', 'Context API', 'React Router', design components showing context providers and consumers, and visual aids like navigation flow diagrams. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this **ReactJS course chapter**."

These prompts are more specific and directly use the template. Looks good.`,
          },
          {
            text: `\`\`\`json
{
  "course": {
    "title": "ReactJS: From Fundamentals to Modern Development",
    "description": "Dive into ReactJS, the popular JavaScript library for building user interfaces. This course covers core concepts, state management, hooks, routing, and best practices to build dynamic and responsive web applications.",
    "category": "Web Development",
    "isVideoIncluded": true,
    "difficulty_level": "Beginner to Intermediate",
    "duration": 8,
    "chapters": [
      {
        "chapterName": "Getting Started with ReactJS",
        "duration": 2,
        "topics": [
          "Introduction to ReactJS and its Core Philosophy",
          "Setting Up Your Development Environment (Node.js, npm/yarn, Create React App)",
          "Understanding JSX Syntax and its Benefits",
          "Creating Your First React Component (Functional Components)",
          "Rendering Elements and Introduction to the Virtual DOM"
        ],
        "imagePrompt": "Create a modern, flat-style 2D digital illustration representing an introduction to ReactJS and its foundational concepts. Include UI/UX elements such as mockup screens displaying simple React code, text blocks with key terms, icons for development tools (Node, npm, React logo), and buttons for code execution. Add symbolic elements related to ReactJS fundamentals, like sticky notes with 'JSX', 'Component', 'Virtual DOM', design components like basic UI wireframes, and visual aids such as a simplified diagram of the Virtual DOM. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this ReactJS course chapter."
      },
      {
        "chapterName": "React Components, Props, and State",
        "duration": 3,
        "topics": [
          "Deep Dive into Functional Components",
          "Understanding Props: Passing Data to Components",
          "Managing Component State with the \`useState\` Hook",
          "Handling Events in React",
          "Conditional Rendering: Showing/Hiding Elements",
          "Rendering Lists and Using Keys Effectively"
        ],
        "imagePrompt": "Create a modern, flat-style 2D digital illustration representing React components, props, and state management. Include UI/UX elements such as mockup screens showing component hierarchies, text blocks explaining data flow, icons for state and props, and interactive buttons. Add symbolic elements related to core ReactJS concepts, like sticky notes with 'Props', 'State', 'Events', design components illustrating parent-child component relationships, and visual aids like flowcharts for props drilling and state updates. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this ReactJS course chapter."
      },
      {
        "chapterName": "Advanced React: Hooks, Context API, and Basic Routing",
        "duration": 3,
        "topics": [
          "Exploring More React Hooks: \`useEffect\` for Side Effects",
          "Introduction to the Context API for Global State Management",
          "Building Reusable Logic with Custom Hooks",
          "Client-Side Routing with React Router (Basic Setup: Route, Link, Switch)",
          "Handling Forms and Controlled Components in React"
        ],
        "imagePrompt": "Create a modern, flat-style 2D digital illustration representing advanced ReactJS features like Hooks, Context API, and client-side routing. Include UI/UX elements such as mockup screens of a complex single-page application, text blocks detailing hook syntaxes, icons for various hooks (e.g., \`useState\`, \`useEffect\`, \`useContext\`) and routing symbols. Add symbolic elements related to advanced ReactJS development, like sticky notes with 'Hooks', 'Context API', 'React Router', design components showing context providers and consumers, and visual aids like navigation flow diagrams. Use a vibrant color palette (blues, purple, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in this ReactJS course chapter."
      }
    ]
  }
}
\`\`\``,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `INSERT_INPUT_HERE`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    for await (const chunk of response) {
      console.log(chunk.text);
    }
  }
