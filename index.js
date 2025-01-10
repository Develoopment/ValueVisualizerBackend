const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const openaimodule = require('openai')


dotenv.config() //this will allow the program to access .env files

const prompt = `
I want you to read this essay and then output the one value and one value only that from the list given that is best conveyed through that essay.

- Personal Development 
- Recognition
- Accountability
- Inspiration
- Music
- Helping Others
- Peace
- Diversity
- Expertise
- Vulnerability
- Global Awareness
- Hunger
- My Country
- Sleep
- Productivity
- Intuition
- Culture
- Healthy Boundaries
- Second Chances
- Listening
- Family
- Excitement
- Travel
- Adventure
- Laughter
- Entrepreneurship
- Wonder
- Health And Fitness
- Love
- Close Relationships
- Humility
- Art
- Responsibility
- Grace
- Autonomy
- Loyalty
- Courage
- Self-love
- Ritual
- Purpose
- Privacy
- Freedom
- Quiet
- Compassion
- Cooperation
- Growth
- Authenticity
- Practicality
- Nature
- Objectivity
- Leadership
- Wisdom
- Respect
- Strength
- Flexibility
- Financial Stability
- Empathy
- Belonging
- Equity
- Resourcefulness
- Decisiveness
- Competence
- Collaboration
- Spirituality
- Social Change
- Honesty
- Mindfulness
- Safety
- Wealth
- Creativity
- Knowledge
- Inclusion
- Curiosity
- Gratitude
- Faith
- Communication
- Interdependence
- Efficiency
- Stability
- Humor
- Truth
- Order
- Excellence
- Religion
- Beauty
- Meaningful Work
- Trust
- Self-expression
- Fun
- Rationality
- Democracy
- Self-control
- Balance
- Adaptability
- Success
- Independence
- Variety
- Community
- Patience
- Challenges

Here is the essay:
`

const essay = `
I want to watch George Washington go shopping. I have an obsession with presidential trivia, and the ivory-gummed general is far and away my favorite. 
Great leaders aren’t necessarily defined by their moments under pressure; sometimes tiny decisions are most telling—like knickers or pantaloons?`

// initlalizing up the OpenAI client
const openai = new openaimodule({apiKey: process.env.OPENAI_API_KEY});

// setting up express app object
const app = express();

// saying that our app should us cors -> this will allow the client to send requests here
app.use(cors());


app.get('/valuescan', async (req, res) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store:false,
        temperature: 0,
        messages:[
            {
                "role":"developer",
                "content": prompt
            },
            {
                "role":"user", 
                "content": essay
            }
        ]
    });


    res.json({"valueOutput":completion.choices[0].message.content})

})

app.listen(process.env.PORT || 9000, () => {console.log('app online at http://localhost:9000/valuescan')});