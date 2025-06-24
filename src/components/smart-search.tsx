import aiGenerate from "@/helpers/ai-generate.helper";
import { usePosts } from "@/hooks/react-query-hooks/use-post";
import { PostType } from "@/types/status.type";
import { Send, X } from "lucide-react";
import { useState } from "react";

const getSearchTypeName = (type: PostType): string => {
  switch (type) {
    case PostType.FOUND_ITEM:
      return "Đồ nhặt được";
    case PostType.SEEK_LOST_ITEM:
      return "Đồ bị mất";
    case PostType.GIVE_AWAY_OLD_ITEM:
      return "Đồ cũ cho tặng";
    case PostType.OTHER:
      return "Khác";
    default:
      return "Tìm kiếm";
  }
};

// const buildViT5Prompt = (query: string, topPosts: any[]) => {
//   const topSentences = topPosts
//     .map((p, i) => `Bài viết ${i + 1}: ${p.title} - ${p.description}`)
//     .join("\n");

//   return `Người dùng hỏi: "${query}"\n\nCác bài viết phù hợp:\n${topSentences}\n\nViết một đoạn phản hồi ngắn, tự nhiên, thân thiện (bằng tiếng Việt) để trả lời người dùng:`;
// };
// const generateNaturalReply = async (prompt: string): Promise<string> => {
//   const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "Bearer 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",
//       "HTTP-Referer": "https://www.sitename.com",
//       "X-Title": "SiteName",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "deepseek/deepseek-r1:free",
//       messages: [{ role: "user", content: prompt }],
//     }),
//   });

//   const data = await res.json();
//   console.log(data);
//   const markdownText =
//     data.choices?.[0]?.message?.content || "No response received.";
//   return markdownText;
// };

const ChatBotLostAndUsedItems = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{ from: string; text: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<PostType>(PostType.FOUND_ITEM);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data } = usePosts({
    limit: 100,
    page: 1,
  });
  const posts = data?.posts || [];

  const getRandomResponse = (type: "found" | "notFound") => {
    const foundResponses = [
      "Tôi tìm thấy một số kết quả phù hợp với mô tả của bạn:",
      "Dựa trên thông tin bạn cung cấp, đây là những bài đăng liên quan:",
      "Có vẻ như những bài viết sau đây khớp với yêu cầu của bạn:",
      "Tôi đã tìm thấy vài thứ có thể hữu ích cho bạn:",
      "Dưới đây là một số gợi ý có thể phù hợp với bạn:",
      "Xem thử những kết quả dưới đây, có thể sẽ giúp ích cho bạn:",
      "Tôi nghĩ bạn sẽ quan tâm đến những thông tin sau:",
      "Những bài viết này có thể liên quan đến thứ bạn đang tìm:",
      "Đây là những gì tôi tìm được dựa trên mô tả của bạn:",
      "Mình có vài gợi ý cho bạn, hãy xem thử nhé:",
      "Đây là một số bài viết có liên quan bạn có thể xem qua:",
      "Thông tin bạn nhập vào khá rõ, tôi tìm được vài kết quả rồi đây:",
      "Có vẻ bạn sẽ quan tâm đến những mục sau:",
      "Dưới đây là những gì tôi tìm thấy khớp với nội dung bạn nhập:",
      "Tôi đã lọc được vài bài viết phù hợp, mời bạn xem:",
    ];

    const notFoundResponses = [
      "Hiện không có thông tin phù hợp, bạn có thể thử mô tả chi tiết hơn không?",
      "Tôi chưa tìm thấy kết quả nào phù hợp, bạn có muốn thử tìm kiếm với từ khóa khác không?",
      "Xin lỗi, tôi không tìm thấy thông tin liên quan. Có thể thử loại bài đăng khác?",
      "Hiện chưa có bài đăng nào khớp với yêu cầu của bạn.",
    ];

    const responses = type === "found" ? foundResponses : notFoundResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getSentences = () => {
    return posts.map((post) => `${post.title} - ${post.description}`);
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const currentQuery = query;

    setMessages((prev) => [...prev, { from: "user", text: currentQuery }]);
    setQuery("");

    try {
      const sentences = getSentences();

      if (sentences.length === 0) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: getRandomResponse("notFound") },
        ]);
        return;
      }

      // const response = await fetch(
      //   "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer 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`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       inputs: {
      //         source_sentence: currentQuery,
      //         sentences: sentences,
      //       },
      //       model: "sentence-transformers/all-MiniLM-L6-v2",
      //     }),
      //   }
      // );

      const prompt = `
Bạn là một trợ lý AI hỗ trợ người dùng trong việc tìm kiếm đồ thất lạc hoặc trả lời các câu hỏi thông thường.

Người dùng vừa nhập nội dung sau: 
"${query}"

Dưới đây là danh sách các bài đăng hiện có (gồm tiêu đề và mô tả):
${sentences.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Nếu người dùng đang tìm kiếm một món đồ (ví dụ như ví, điện thoại, chìa khóa...), hãy so sánh nội dung người dùng nhập với các bài đăng và đưa ra phản hồi tự nhiên bằng tiếng Việt. Nếu có bài viết phù hợp, hãy nói rõ **"Tôi tìm thấy một số kết quả phù hợp:"** và liệt kê tối đa 3 kết quả phù hợp nhất. Nếu không có bài viết phù hợp, hãy nói rõ là **không có kết quả phù hợp** và **khuyến khích người dùng thử lại với thông tin chi tiết hơn**.
Nếu người dùng không hỏi về việc tìm đồ thất lạc, hãy phản hồi lại một cách **thân thiện, tự nhiên, đúng nội dung câu hỏi**, không cần tham chiếu đến danh sách bài đăng.

Luôn trả lời ngắn gọn, dễ hiểu, và đúng trọng tâm.
`;

      const res = await aiGenerate(prompt);
      setMessages((prev) => [...prev, { from: "bot", text: res }]);
      // const scoredPosts = result
      //   .map((score: number, index: number) => ({
      //     ...posts[index],
      //     score,
      //   }))
      //   .sort((a, b) => b.score - a.score);

      // const topPosts = scoredPosts
      //   .slice(0, 3)
      //   .filter((post) => post.score > 0.3);

      // if (topPosts.length > 0) {
      //   const prompt = buildViT5Prompt(currentQuery, topPosts);
      //   const reply = await generateNaturalReply(prompt);

      //   setMessages((prev) => [...prev, { from: "bot", text: reply }]);
      // } else {
      //   setMessages((prev) => [
      //     ...prev,
      //     { from: "bot", text: getRandomResponse("notFound") },
      //   ]);
      // }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Có lỗi xảy ra khi xử lý yêu cầu, bạn vui lòng thử lại sau nhé!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 right-6 z-50" style={{ zIndex: 1000 }}>
        {/* Ping Animation Ring */}
        <div className="absolute inset-0 w-16 h-16 bg-primary rounded-full animate-ping opacity-75"></div>

        {/* Main Button */}
        <button
          onClick={togglePopup}
          className="relative w-16 h-16 bg-gradient-to-r bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          {/* Chat Bot Avatar */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="text-2xl">🤖</div>
          </div>
        </button>
      </div>

      {/* Popup Chat */}
      {isPopupOpen && (
        <div className="fixed bottom-20 right-6 z-10000 ">
          <div className="bg-white rounded-lg shadow-2xl w-80 h-[500px] flex flex-col border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
              <h3 className="text-lg font-semibold">🤖 AI Tìm Đồ Thất Lạc</h3>
              <button
                onClick={togglePopup}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Type Buttons */}
            {/* <div className="p-3 border-b bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {[
                  PostType.FOUND_ITEM,
                  PostType.SEEK_LOST_ITEM,
                  PostType.GIVE_AWAY_OLD_ITEM,
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSearchType(type)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      searchType === type
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {getSearchTypeName(type)}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm">
                  👋 Xin chào! Hãy mô tả đồ vật bạn cần tìm
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      msg.from === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg rounded-bl-none text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={query}
                  placeholder="Nhập mô tả đồ bạn cần tìm..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !loading && handleSend()
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !query.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotLostAndUsedItems;
