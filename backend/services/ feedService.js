import Feed from "../model/Feed.js";

export const getAllFeedsFromDB = async () => {
  return await Feed.find().sort({ createdAt: -1 });
};

export const createFeedInDB = async (data) => {
  return await Feed.create(data);
};



// "use client";

// import { useState } from "react";

// import API from "../../services/api";

// export default function AdminPage() {
//   const [title, setTitle] = useState("");

//   const [message, setMessage] = useState("");

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await API.post("/feed", {
//         title,
//         message,
//       });

//       alert("Feed Added");

//       setTitle("");

//       setMessage("");

//       setLoading(false);
//     } catch (error) {
//       console.log(error);

//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-6">
//         Admin Panel
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 max-w-md"
//       >
//         <input
//           type="text"
//           placeholder="Title"
//           className="border p-3 w-full"
//           value={title}
//           onChange={(e) =>
//             setTitle(e.target.value)
//           }
//         />

//         <textarea
//           placeholder="Message"
//           className="border p-3 w-full"
//           value={message}
//           onChange={(e) =>
//             setMessage(e.target.value)
//           }
//         />

//         <button
//           type="submit"
//           className="bg-black text-white px-6 py-3 rounded"
//         >
//           {loading
//             ? "Adding..."
//             : "Add Feed"}
//         </button>
//       </form>
//     </div>
//   );
// }
