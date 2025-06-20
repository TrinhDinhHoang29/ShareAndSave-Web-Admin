
# 📡 WebSocket Chat API Documentation

## 🌐 Overview

This WebSocket API supports a real-time chat system with two main functionalities:

- **1-on-1 chat communication** via `/chat`
- **Notification-only connection** to receive new message alerts via `/chat-noti`

All WebSocket connections require authentication using middleware (`AuthGuard`).

---

## 🔐 Authentication

Clients must connect using a valid JWT token in the `Authorization` header or cookie depending on your implementation.

---

## 🔗 Route: `/chat`

Client connects to WebSocket server via:

```
ws://34.142.168.171:8001/chat
```

This connection handles **chat between two users**, including:

- Joining a 1-on-1 chat room
- Sending messages
- Leaving a room

---

## 🔗 Route: `/chat-noti`

Client connects to WebSocket server via:

```
ws://34.142.168.171:8001/chat-noti
```

This connection **only receives notification** when someone sends a message to the user. It is used to display badge counts or alerts.

---

## 📥 Request Structure

```json
{
  "event": "event_name",
  "data": { /* data depends on event */ }
}
```

## 📤 Response Structure

```json
{
  "event": "event_name",
  "status": "success",
  "data": { /* depends on event */ },
  "error": ""
}
```

---

# 🎯 Events

## 🔸 join_room

Client joins a specific chat room.

### 🔽 Request

```json
{
  "event": "join_room",
  "data": {
    "interestID": 123
  }
}
```

### 🔼 Response

```json
{
  "event": "join_room_response",
  "status": "success",
  "data": {
    "roomID": "chat:postOwner:1:user:123",
    "timestamp": "2025-06-14T10:00:00Z"
  },
  "error": ""
}
```

---

## 🔸 send_message

Client sends a chat message to the room.

### 🔽 Request

```json
{
  "event": "send_message",
  "data": {
    "interestID": 123,
    "isOwner": true,
    "userID": 123,
    "message": "Hello!"
  }
}
```

### 🔼 Response

```json
{
  "event": "send_message_response",
  "status": "success",
  "data": {
    "interestID": 123,
    "roomID": "chat:postOwner:1:user:123",
    "senderID": 1,
    "message": "Hello!",
    "timestamp": "2025-06-14T10:05:00Z"
  },
  "error": ""
}
```

---

## 🔸 send_message (on /chat-noti)

When a message is sent to another user, that user receives a notification via `/chat-noti`.

### 🔼 Response

```json
{
  "event": "send_message_response",
  "status": "success",
  "data": {
    "interestID": 123,
    "type": "following",
    "userID": 1,
    "timestamp": "2025-06-14T10:06:00Z"
  },
  "error": ""
}
```

---

## 🔸 join_noti_room_response

Sent automatically when user connects to `/chat-noti`.

### 🔼 Response

```json
{
  "event": "join_noti_room_response",
  "status": "success",
  "data": {
    "roomID": "chatNoti:user:1",
    "timestamp": "2025-06-14T10:00:00Z"
  },
  "error": ""
}
```

---

## 🔸 left_room

User leaves a chat room.

### 🔽 Request

```json
{
  "event": "left_room",
  "data": {
    "interestID": 123
  }
}
```

### 🔼 Response

```json
{
  "event": "left_room_response",
  "status": "success",
  "data": {
    "roomID": "chat:postOwner:1:user:123",
    "timestamp": "2025-06-14T10:10:00Z"
  },
  "error": ""
}
```

---

---

## 🧾 Struct Summary

### 📥 EventRequest

```go
type EventRequest struct {
    Event string          `json:"event"` // Tên sự kiện (vd: "send_message", "join_room")
    Data  json.RawMessage `json:"data"`  // Payload JSON chưa giải mã, sẽ được decode theo từng sự kiện
}
```

### 📤 EventResponse

```go
type EventResponse struct {
    Event  string      `json:"event"`  // Tên sự kiện phản hồi
    Status string      `json:"status"` // Trạng thái xử lý: "success" hoặc "error"
    Data   interface{} `json:"data"`   // Dữ liệu trả về (tuỳ loại sự kiện)
    Error  string      `json:"error"`  // Thông tin lỗi (nếu có)
}
```

### 📥 SendMessageDataRequest

```go
type SendMessageDataRequest struct {
    InterestID uint   `json:"interestID"` // ID đối tượng tương tác
    IsOwner    bool   `json:"isOwner"`    // Có phải chủ bài đăng không
    UserID     uint   `json:"userID"`     // ID người gửi
    Message    string `json:"message"`    // Nội dung tin nhắn
}
```

### 📤 SendMessageDataResponse

```go
type SendMessageDataResponse struct {
    SenderID   uint      `json:"senderID"`   // ID của người gửi
    InterestID uint      `json:"interestID"` // ID của bài đăng liên quan
    RoomID     string    `json:"roomID"`     // ID phòng chat
    Message    string    `json:"message"`    // Nội dung tin nhắn
    TimeStamp  time.Time `json:"timestamp"`  // Thời gian gửi
}
```

### 📤 SendMessageNotiDataResponse

```go
type SendMessageNotiDataResponse struct {
    Type       string    `json:"type"`       // Loại thông báo: "following", "followedBy"
    InterestID uint      `json:"interestID"` // ID bài đăng liên quan
    UserID     uint      `json:"userID"`     // ID người dùng
    TimeStamp  time.Time `json:"timestamp"`  // Thời gian gửi thông báo
}
```

### 📥 JoinRoomDataRequest

```go
type JoinRoomDataRequest struct {
    InterestID uint `json:"interestID"` // ID đối tượng tạo phòng chat
}
```

### 📤 JoinRoomDataResponse

```go
type JoinRoomDataResponse struct {
    RoomID    string    `json:"roomID"`     // ID phòng đã vào
    TimeStamp time.Time `json:"timestamp"`  // Thời điểm vào phòng
}
```

### 📥 LeftRoomDataRequest

```go
type LeftRoomDataRequest struct {
    InterestID uint `json:"interestID"` // ID đối tượng để rời phòng chat
}
```

### 📤 LeftRoomDataResponse

```go
type LeftRoomDataResponse struct {
    RoomID    string    `json:"roomID"`     // ID phòng đã rời
    TimeStamp time.Time `json:"timestamp"`  // Thời điểm rời phòng
}
```
---

## 📎 Notes

- `roomID` được cấu hình theo định dạng: `chat:interest:<interestID>`
- Endpoint `/chat-noti` sẽ chỉ nhận thông báo, không gửi được tin nhắn.
