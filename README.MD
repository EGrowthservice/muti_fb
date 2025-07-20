muti_facebook_pro/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── facebook.ts
│   │   │   └── payos.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── fanpage.controller.ts
│   │   │   ├── post.controller.ts
│   │   │   ├── comment.controller.ts
│   │   │   ├── message.controller.ts
│   │   │   └── payment.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── package.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── fanpage.model.ts
│   │   │   ├── post.model.ts
│   │   │   ├── comment.model.ts
│   │   │   ├── message.model.ts
│   │   │   └── package.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── fanpage.routes.ts
│   │   │   ├── post.routes.ts
│   │   │   ├── comment.routes.ts
│   │   │   ├── message.routes.ts
│   │   │   └── payment.routes.ts
│   │   ├── services/
│   │   │   ├── facebook.service.ts
│   │   │   ├── payos.service.ts
│   │   │   └── queue.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── jwt.util.ts
│   │   │   └── error.util.ts
│   │   ├── socket/
│   │   │   └── message.socket.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── fanpage/
│   │   │   ├── post/
│   │   │   ├── comment/
│   │   │   ├── message/
│   │   │   └── payment/
│   │   ├── components/
│   │   │   ├── AuthForm.tsx
│   │   │   ├── FanpageList.tsx
│   │   │   ├── PostList.tsx
│   │   │   ├── CommentList.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── PackageSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useFanpage.ts
│   │   │   └── useSocket.ts
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── socket.ts
│   │   ├── pages/
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── fanpage.tsx
│   │   │   ├── posts.tsx
│   │   │   ├── messages.tsx
│   │   │   └── payment.tsx
│   │   └── styles/
│   │       └── globals.css
│   ├── public/
│   ├── .env.local
│   ├── package.json
│   └── tsconfig.json