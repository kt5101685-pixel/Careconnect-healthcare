document.addEventListener("DOMContentLoaded", function () {

    const supportForm = document.getElementById("supportForm");

if (supportForm) {

    supportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const age = document.getElementById("age").value;
        const supportType = document.getElementById("supportType").value;
        const location = document.getElementById("location").value.trim();
        const message = document.getElementById("message").value.trim();

        const supportRequest = {
            name: name,
            email: email,
            phone: phone,
            age: age,
            supportType: supportType,
            location: location,
            message: message,
            submittedAt: new Date().toLocaleString()
        };

        let requests =
            JSON.parse(localStorage.getItem("supportRequests")) || [];

        requests.push(supportRequest);

        localStorage.setItem(
            "supportRequests",
            JSON.stringify(requests)
        );

        const response =
            document.getElementById("supportResponse");

        if (response) {

            response.innerHTML =
                `✅ Thank you, ${name}! Your healthcare support request has been received. Our support team will review your request and contact you soon.`;

            response.style.display = "block";

        }

        supportForm.reset();

    });

}

    const volunteerForm =
    document.getElementById("volunteerForm");

if (volunteerForm) {

    volunteerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("volunteerName").value.trim();

        const email =
            document.getElementById("volunteerEmail").value.trim();

        const phone =
            document.getElementById("volunteerPhone").value.trim();

        const skills =
            document.getElementById("skills").value.trim();

        const availability =
            document.getElementById("availability").value;

        const volunteer = {

            name: name,
            email: email,
            phone: phone,
            skills: skills,
            availability: availability,
            registeredAt: new Date().toLocaleString()

        };

        let volunteers =
            JSON.parse(localStorage.getItem("volunteers")) || [];

        volunteers.push(volunteer);

        localStorage.setItem(
            "volunteers",
            JSON.stringify(volunteers)
        );

        const response =
            document.getElementById("volunteerResponse");

        if (response) {

            response.innerHTML =
                `✅ Thank you, ${name}! Your volunteer registration has been successfully received. Our team will review your details and contact you regarding the next steps.`;

            response.style.display = "block";

        }

        volunteerForm.reset();

    });

}

    

    const chatMessages =
        document.getElementById("chatMessages");

    const userQuestion =
        document.getElementById("userQuestion");

    const faqAnswers = {

        support:
            "You can request healthcare support by filling out the Support Request form above. Our team will review your request and contact you.",

        volunteer:
            "You can become a volunteer by completing the Volunteer Registration form. Please provide your skills and availability.",

        response:
            "After submitting your request, our support team will review it and contact you as soon as possible."

    };

    window.askQuestion = function (questionType) {

        const answer =
            faqAnswers[questionType];

        addMessage(
            getQuestionText(questionType),
            "user"
        );

        setTimeout(function () {

            addMessage(
                answer,
                "bot"
            );

        }, 500);

    };

    function getQuestionText(questionType) {

        if (questionType === "support") {

            return "How can I request support?";

        }

        if (questionType === "volunteer") {

            return "How can I volunteer?";

        }

        if (questionType === "response") {

            return "When will I receive a response?";

        }

        return "I have a question.";

    }

    function addMessage(message, sender) {

        if (!chatMessages) {

            return;

        }

        const messageDiv =
            document.createElement("div");

        if (sender === "user") {

            messageDiv.classList.add(
                "user-message"
            );

        } else {

            messageDiv.classList.add(
                "bot-message"
            );

        }

        messageDiv.textContent = message;

        chatMessages.appendChild(
            messageDiv
        );

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }

    window.sendQuestion = function () {

        if (!userQuestion) {

            return;

        }

        const question =
            userQuestion.value.trim();

        if (question === "") {

            return;

        }

        addMessage(
            question,
            "user"
        );

        userQuestion.value = "";

        const answer =
            generateAnswer(question);

        setTimeout(function () {

            addMessage(
                answer,
                "bot"
            );

        }, 500);

    };

    function generateAnswer(question) {

        const text =
            question.toLowerCase();

        if (
            text.includes("support") ||
            text.includes("help") ||
            text.includes("healthcare") ||
            text.includes("medical")
        ) {

            return faqAnswers.support;

        }

        if (
            text.includes("volunteer") ||
            text.includes("join") ||
            text.includes("volunteering")
        ) {

            return faqAnswers.volunteer;

        }

        if (
            text.includes("response") ||
            text.includes("contact") ||
            text.includes("reply") ||
            text.includes("when")
        ) {

            return faqAnswers.response;

        }

        return "I'm sorry, I don't have an answer for that yet. Please submit the Support Request form and our team will help you.";

    }

    if (userQuestion) {

        userQuestion.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    window.sendQuestion();

                }

            }
        );

    }

});