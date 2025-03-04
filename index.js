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

Remember to ONLY output one word. Here is the essay:
`

// initlalizing up the OpenAI client
const openai = new openaimodule({apiKey: process.env.OPENAI_API_KEY});

// setting up express app object
const app = express();

// saying that our app should us cors -> this will allow the client to send requests here
app.use(cors());
app.use(express.json())


const testEssays = [
    "I love to create interesting things",
    "I love to workout outdoors and go on runs and I enjoy using that time to reflect on the world",
    "Computers amaze me because they are heralding a interesting future."
]

app.post('/valuescan', async(req, res) => {


    const essayList = req.body;
    // console.log(essayList)

    // const essayList = testEssays;

    let valueList = [];

    // I had to use a for loop instead .map() because using async funcitons in .map() doesn't work properly
    // This way, I get the values in order

    // also important: this order or [index, essay] is imporatnt because destructuring essayList.entries() assigns the index to the first variable regardless of name
    for (const [index, essay] of essayList.entries()) {

        try{
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                store: false,
                temperature: 0,
                messages: [
                    {
                        role: "developer",
                        content: prompt
                    },
                    {
                        role: "user",
                        content: essay
                    }
                ]
            });
        
            const value = completion.choices[0].message.content;
            valueList.push(value);
        }
        catch(error){
            console.log(error);
        }
        
    }
    
    res.json(valueList)


})

app.listen(process.env.PORT || 9000, () => {console.log('app online at http://localhost:9000/valuescan')});