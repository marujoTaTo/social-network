const buttonSubmit = document.getElementById("buttonSubmit")

buttonSubmit.addEventListener("click", createAccount)

async function createAccount (event) {
    event.preventDefault()
    try { 
        const username = document.getElementById("inputUsername")
        const password = document.getElementById("inputPassword")
        const payload = {username, password}

        const response = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ payload })
        })

        if(!response.ok) {
            throw new Error(`Status ${response.status}`)
        }
        const data = await response.json()
        localStorage.setItem("authToken", data.token)
    } catch(err){
        console.log(`Error: ${err}`)
    }
} 
