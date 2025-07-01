// const aiGenerate = async (prompt: string): Promise<string> => {
//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${keyB}`,
//         "HTTP-Referer": "https://www.sitename.com",
//         "X-Title": "SiteName",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-r1:free",
//         messages: [{ role: "user", content: prompt }],
//       }),
//     });

//     const data = await res.json();
//     return data.choices?.[0]?.message?.content || "Không có phản hồi từ AI.";
//   } catch (error) {
//     console.error("AI request error:", error);
//     return "⚠️ Có lỗi xảy ra khi xử lý yêu cầu, bạn vui lòng thử lại sau nhé!";
//   }
// };
// export default aiGenerate;
// const keyA =
//   "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";
// const keyB =
//   "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";
