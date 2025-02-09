```plaintext
+------------------+
|   User Action   |
+------------------+
         |
         v
+----------------------------+
| API Call: POST /api/update |
+----------------------------+
         |
         v
+----------------------------+
| Validate Request Data      |
| - Check userId and score   |
| - Verify authToken         |
+----------------------------+
         |
         v
+----------------------------+
| Authenticate User          |
| - Validate authToken       |
| - Reject if unauthorized   |
+----------------------------+
         |
         v
+----------------------------+
| Update Score in Database   |
| - Locate user record       |
| - Update score field       |
| - Update timestamp         |
+----------------------------+
         |
         v
+----------------------------+
| Fetch Updated Leaderboard  |
| - Retrieve top 10 scores 
 API Call: GET /api/top   |
+----------------------------+
         |
         v
+----------------------------+
| Send Response to Client    |
| - Return success message   |
| - Return updated score     |
+----------------------------+
         |
         v
+----------------------------+
| Broadcast Real-time Update |
| - Push update via WebSocket |
+----------------------------+
```

