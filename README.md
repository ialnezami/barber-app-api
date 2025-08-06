Setup Instructions

### **Local MongoDB Setup:**

1. **Install MongoDB locally:**
   ```bash
   # macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community
   
   # Ubuntu/Debian
   sudo apt-get install mongodb
   sudo systemctl start mongodb
   
   # Windows - Download from https://www.mongodb.com/download-center/community
   ```

2. **Or use MongoDB with Docker:**
   ```bash
   docker run --name mongodb -p 27017:27017 -d mongo:latest
   ```

### **Project Setup:**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Seed the database:**
   ```bash
   npm run seed
   ```

4. **Start development server:**
   ```bash
   npm run start:dev
   ```

5. **Access the application:**
   - API: `http://localhost:3000`
   - Swagger Docs: `http://localhost:3000/api`

## 14. MongoDB Atlas (Cloud) Setup

### **For Production/Cloud:**

1. **Create MongoDB Atlas account** at https://www.mongodb.com/cloud/atlas

2. **Create a cluster and get connection string:**
   ```env
   MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/barber_rdv?retryWrites=true&w=majority"
   ```

3. **Update environment variables:**
   ```env
   NODE_ENV=production
   JWT_SECRET="your-production-jwt-secret"
   MONGODB_URI="your-atlas-connection-string"
   ``



   API Testing Examples

### **Register a new customer:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

### **Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### **Create appointment (with JWT token):**
```bash
curl -X POST http://localhost:3000/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "date": "2025-08-07T10:00:00Z",
    "notes": "Haircut and beard trim"
  }'
```

### **Get available time slots:**
```bash
curl -X GET http://localhost:3000/timeslots/available \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 17. Key MongoDB Advantages

### **Benefits of Using MongoDB:**

1. **Flexible Schema**: Easy to add new fields without migrations
2. **JSON-like Documents**: Natural fit for JavaScript/Node.js applications
3. **Horizontal Scaling**: Built-in sharding support
4. **Rich Queries**: Powerful aggregation pipeline
5. **Cloud Ready**: MongoDB Atlas provides managed hosting

### **Document Structure Examples:**

```javascript
// User Document
{
  "_id": ObjectId("64f1a2b3c4d5e6f789012345"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$...",
  "role": "CUSTOMER",
  "createdAt": ISODate("2025-08-06T10:00:00Z"),
  "updatedAt": ISODate("2025-08-06T10:00:00Z")
}

// Appointment Document
{
  "_id": ObjectId("64f1a2b3c4d5e6f789012346"),
  "date": ISODate("2025-08-07T10:00:00Z"),
  "userId": ObjectId("64f1a2b3c4d5e6f789012345"),
  "status": "pending",
  "notes": "Haircut and beard trim",
  "createdAt": ISODate("2025-08-06T10:00:00Z"),
  "updatedAt": ISODate("2025-08-06T10:00:00Z")
}
```

## 18. Production Considerations

### **Security Enhancements:**
```typescript
// Rate limiting with MongoDB
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { MongooseThrottlerStorageService } from 'nestjs-throttler-storage-mongoose';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [MongooseModule],
      useFactory: (mongooseModuleOptions) => ({
        ttl: 60,
        limit: 10,
        storage: new MongooseThrottlerStorageService(mongooseModuleOptions),
      }),
      inject: [getConnectionToken()],
    }),
  ],
})
export class AppModule {}
```

### **Database Indexing:**
```typescript
// Add indexes for better performance
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.index({ userId: 1 });
AppointmentSchema.index({ date: 1 });

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
TimeSlotSchema.index({ date: 1, isBooked: 1 });
```

This MongoDB implementation provides the same functionality as the PostgreSQL version but leverages MongoDB's document-based approach, making it more flexible for future feature additions and easier to scale horizontally.