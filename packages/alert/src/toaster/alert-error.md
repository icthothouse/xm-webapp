# Alert popups and messages
## Configuration
#### Example
Some jhipster error:
```json
{
  "type": "https://www.jhipster.tech/problem/problem-with-message",
  "title": "Bad Request",
  "status": 400,
  "detail": "Failed to convert value of type 'java.lang.String' to required type 'java.lang.Long'; nested exception is java.lang.NumberFormatException: For input string: \"input\"",
  "path": "/api/v1/entity/resource",
  "message": "error.http.400"
}
```
Public ui Configuration example to pass a custom message:
```yaml
responseConfig:
  responses:
    - status: 400
      code: '/api/v1/entity/resource'
      codePath: 'path'
      type: 'alert'
      outputMessage:
        type: 'MESSAGE_OBJECT'
        value: 'My friendly error message.'
```