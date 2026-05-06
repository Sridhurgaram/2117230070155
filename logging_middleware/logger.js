async function Log(stack, level, packageName, message) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlkaHVyZ2Euci4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJleHAiOjE3NzgwNDU5NDgsImlhdCI6MTc3ODA0NTA0OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjYwMzM1MWZkLTg2YzUtNDk4Mi1hNWY0LTdkZTc3NjRlYzUyNiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNyaWRodXJnYSByIiwic3ViIjoiOWQzYmVmOWUtMGQxZC00Yjk4LWEwNDMtMjM5MTk1MDJhM2ZhIn0sImVtYWlsIjoic3JpZGh1cmdhLnIuMjAyMy5haWRzQHJpdGNoZW5uYWkuZWR1LmluIiwibmFtZSI6InNyaWRodXJnYSByIiwicm9sbE5vIjoiMjExNzIzMDA3MDE1NSIsImFjY2Vzc0NvZGUiOiJCVENEcVQiLCJjbGllbnRJRCI6IjlkM2JlZjllLTBkMWQtNGI5OC1hMDQzLTIzOTE5NTAyYTNmYSIsImNsaWVudFNlY3JldCI6Ik1NUGZCZEJEa0NBSG54VGEifQ.znyggWaZ9_7M7WsQr_fekZoGGko_Dts-xIuAIRWQ6Gw";

    const logData = {
        stack: stack,
        level: level,
        package: packageName,
        message: message
    };

    try {
        const response = await fetch(
            "http://20.207.122.201/evaluation-service/logs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(logData)
            }
        );

        const data = await response.json();
        console.log("SUCCESS:", data);

    } catch (error) {
        console.error("ERROR:", error);
    }
}

// TEST CALL
Log("frontend", "info", "state", "Testing logging");