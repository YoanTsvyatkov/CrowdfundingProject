const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { paymentController } = require("./routers/payment-controller");
const { sqInst } = require("./util/database");
const { User } = require("./model/User");
const { StartupProject } = require("./model/StartupProject");
const { InvestmentOrder } = require("./model/InvestmentOrder");
const { projectController } = require("./routers/startup-project-controller")
const { authController } = require("./routers/auth-controller");
const bodyParser = require('body-parser');
const { UserService } = require("./service/user-service.js")
const { ProjectService } = require("./service/project-service.js");
const {Categories} = require("./model/Categories.js");

const user = new UserService();
const startup = new ProjectService();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static('client'));
app.use("/api/", paymentController)

function initRouters(path, routhers) {
    app.use(path, routhers);
}

app.use(bodyParser.json())
initRouters("/api/", [projectController, authController]);

app.all("/*", (req, res) => {
    res.sendStatus(404);
});

const createRelationships = () => {
    StartupProject.hasMany(InvestmentOrder, { foreignKey: 'startupID', sourceKey: 'ID' });
    StartupProject.belongsTo(User, { foreignKey: 'creatorID', sourceKey: 'profileID' });
    InvestmentOrder.belongsTo(User, { foreignKey: 'userID', sourceKey: 'profileID' });
    InvestmentOrder.belongsTo(StartupProject, { foreignKey: 'startupID', sourceKey: 'ID' });
    User.hasMany(InvestmentOrder, { foreignKey: 'userID', sourceKey: 'profileID' });
    User.hasMany(StartupProject, { foreignKey: 'creatorID', sourceKey: 'profileID' });
}


const populateStartup = async () => {
    const creator_1 = await (user.getUserByEmail("sandra.kai@gmail.com"));
    await startup.createStartup(10000, Categories.Technology, "This electronics project is a fully functioning ventilator with the ability to provide ventilation to a patient with adjustable pumping settings with Blood oxygen monitor.", "Ventilator Using Arduino", 0, 10000, creator_1.profileID);
    await startup.createStartup(10000, Categories.Technology, "A virtual doctor robot that allows a doctor to virtually move around at a remote location at will and even talk to people at remote location as desired.", "IOT Virtual Doctor Robot", 0, 10000, creator_1.profileID);
    await startup.createStartup(10000, Categories.Technology, "A fire extinguisher drone that can reach high rise buildings of forest fires in a matter of minutes to drop fire extinguisher balls to stop the spread of fire in no time.", "Fire Extinguisher Drone", 0, 10000, creator_1.profileID);
    await startup.createStartup(10000, Categories.Technology, "We have been advised to wash hands regularly during the pandemic, but can we afford to waste so much water for handwash. Well here is a new age fog handwash machine that saves 95% water.", "Dry Handwash using Fog to Save Water", 0, 10000, creator_1.profileID);
    await startup.createStartup(10000, Categories.Technology, "A thermal screening drone with live camera monitor as well as thermal screening using Raspberry Pi to check heating in towers, solar panels, tall structures and more.", "Ras Pi Thermal Screening Drone", 0, 10000, creator_1.profileID);
    await startup.createStartup(10000, Categories.Technology, "We design a 360 degree disinfection box using ultraviolet sterilization by UV-C technology proven to deactivate coronaviruses, with timer and safety shutoff settings.", "Arduino CoVid Disinfection Box", 0, 10000, creator_1.profileID);
    

    const creator_2 = await (user.getUserByEmail("kate.gordon@gmail.com"));
    await startup.createStartup(10000, Categories["Food and Craft"], "Make these paper pumpkins to decorate your home or classroom for Halloween or autumn. You can put them on tables, hang them or string smaller paper pumpkins together into a Halloween garland.", "3D Paper Pumpkin", 0, 10000, creator_2.profileID);
    await startup.createStartup(10000, Categories["Food and Craft"], "Mix two or more types of seeds on a plate or shallow container. Apply a thick layer of glue on the napkin ring, then let kids sprinkle, spoon on some seeds, or roll the napkin ring onto the plate of seeds.", "Seed Mosaic Napkin Rings", 0, 10000, creator_2.profileID);
    await startup.createStartup(10000, Categories["Food and Craft"], "Jams and jellies are a great low-cost business to start for entrepreneurs interested in growing their own fresh produce", "Homemade jams and jellies", 0, 10000, creator_2.profileID);
    await startup.createStartup(10000, Categories["Food and Craft"], "You could mass produce  organic products using special watering systems in just the right time", "Organic foods", 0, 10000, creator_2.profileID);
    await startup.createStartup(10000, Categories["Food and Craft"], "Restaurant serving specially prepared space food in space-like environment", "space restaurant", 0, 10000, creator_2.profileID);
    await startup.createStartup(10000, Categories["Food and Craft"], "Unique coffee shop with a lot of free animals that wonder around for every animal lover", "Animal coffee shop", 0, 10000, creator_2.profileID);

    const creator_3 = await (user.getUserByEmail("gabriel.sanders@gmail.com"));
    await startup.createStartup(10000, Categories["Games and Films"], "A game where the protagonist is a spirit possessing people.", "The Possessor", 0, 10000, creator_3.profileID);
    await startup.createStartup(10000, Categories["Games and Films"], "A film company that produces high-quallity short films", "ShortFilmsProducers", 0, 10000, creator_3.profileID);
    await startup.createStartup(10000, Categories["Games and Films"], "First Person game where you're a newly created AI, but the engineers who built you did it by accident and are deathly afraid of AI", "I AM AI", 0, 10000, creator_3.profileID);
    await startup.createStartup(10000, Categories["Games and Films"], "game set in a detective theme where the detective is trying to solve a crime but. inadvertently keeps finding hints that he is in a simulator", "Reality Detection", 0, 10000, creator_3.profileID);
    await startup.createStartup(10000, Categories["Games and Films"], "sfollowing the opening sequence / bank robbery, the protagonist player receives a card in the mail with three names and three addresses", "Robbery Mistery", 0, 10000, creator_3.profileID);
    await startup.createStartup(10000, Categories["Games and Films"], "a city-building simulator along the lines of SimCity, with the added wrinkle of having to deal with politics, the media, and a never-ending series of scandals.", "Reality Simulator", 0, 10000, creator_3.profileID);

    const creator_4 = await (user.getUserByEmail("samuel.berry@gmail.com"));
    await startup.createStartup(10000, Categories.Medical, "autonomous drone deliveries of critical medical samples including blood or tissue between two branches of a hospital", "Drone-delivered medical supplies", 0, 10000, creator_4.profileID);
    await startup.createStartup(10000, Categories.Medical, "Named for Africa’s 54 countries, the Nigeria-based startup is sourcing genetic material from volunteers across the continent, to make drug research and development more equitable", "bio bank", 0, 10000, creator_4.profileID);
    await startup.createStartup(10000, Categories.Medical, "The device on his wrist is the CTRL-kit, which detects the electrical impulses that travel from the motor neurons down the arm muscles", "mind reading wristband", 0, 10000, creator_4.profileID);
    await startup.createStartup(10000, Categories.Medical, "ultrasound technology on a chip, so instead of a $100,000 machine in a hospital, it’s a $2,000 go-anywhere gadget", "pocket ultrasound", 0, 10000, creator_4.profileID);
    await startup.createStartup(10000, Categories.Medical, "BenevolentAI has created algorithms that scour research papers, clinical trial results and other sources of biomedical information", "Research AI", 0, 10000, creator_4.profileID);
    await startup.createStartup(10000, Categories.Medical, "personalized 3-D models that can be rotated and zoomed into, so doctors can simulate various approaches on screens", "3-D digital hearts", 0, 10000, creator_4.profileID);

    const creator_5 = await(user.getUserByEmail("barbara.colins@gmail.com"));
    await startup.createStartup(10000, Categories["Music and Arts"], "This ingenious smoothie maker takes the waveforms of different tracks, before categorising them as either ‘sentimental’, ‘romantic’, ‘happy’ or ‘sad’ and matching them to ‘corresponding’-ish flavours such as sweet, salty and sour etc", "Tasty Music", 0, 10000, creator_5.profileID);
    await startup.createStartup(10000, Categories["Music and Arts"], "If you have a tattoo and you, or someone else, has the Skin Motion app on their phone – you can point the phone at the tattoo and hear the real audio file played back", "Soundwave Tattoo", 0, 10000, creator_5.profileID);
    await startup.createStartup(10000, Categories["Music and Arts"], "directs sound in one direction, so anyone directly against the sound can hear it but others cannot hear it that well", "Directed Speaker", 0, 10000, creator_5.profileID);
    await startup.createStartup(10000, Categories["Music and Arts"], "PageFlip puts the focus firmly back on those actually playing the instruments though, solving the age old issue of turning a page of music while playing. ", "PageFlip Firefly", 0, 10000, creator_5.profileID);
    await startup.createStartup(10000, Categories["Music and Arts"], "By using Blockchain technology Zimrii will cut out intermediaries making it faster, easier and more rewarding for everyone involved.", "Zimrii Music", 0, 10000, creator_5.profileID);
    await startup.createStartup(10000, Categories["Music and Arts"], "KP2S represents a refinement in a technology that has been around for more than 15 years now. It is described as ‘a powered-up Mini Kaoss Pad 2,", "Korg Mini Kaoss Pad 2S", 0, 10000, creator_5.profileID);

}

const populateUser = async () =>
{
    await user.createUser("Josh", "Murry", 25, "data scientist", "josh.murry@gmail.com", "0123456789", 
    "MCA with distinction and seven years of experience as a data scientist.", "jOshIsMYRry1!");
    
    await user.createUser("Robert", "Laurence", 25, "business analyst", "robert.laurence@gmail.com", "7370312696", 
    "MBA with seven years of experience in budgeting, forecasting and financial modelling. ","h9VC9PMG");

    await user.createUser("Rachel", "Isidor", 32, "nurse", "rachel.isidor@gmail.com", "0827966893", 
    "10 years of experience in City Hospital with a certificate in nursing and midwife training. ", "uMXWGRfe");

    await user.createUser("Tim", "Johnson", 52, "accountant", "tim.johnson@gmail.com", "6134108481", 
    "1st class M.Com, ICWA certified accountant with seven years of experience.","BzGMsUbN");

    await user.createUser("Gerry", "Green", 45, "marketing manager", "gerry.green@gmail.com", "9333725477", 
    "Expert digital marketing professional with 13 years' experience.","7t3xCp9n");

    await user.createUser("Sandra", "Kai", 29, "IT specialist", "sandra.kai@gmail.com", "1279136416", 
    "Problem-solving information technology specialist with six years of experience","3pCXPMFd");

    await user.createUser("Samuel", "Berry", 46, "physician", "samuel.berry@gmail.com", "5418248364", 
    "A professional and detail-oriented physician with over seven years of experience in cardiology","yZ9jhvSn");

    await user.createUser("Gabriel", "Sanders", 37, "teacher", "gabriel.sanders@gmail.com", "8246481444", 
    "Engaging and encouraging teaching professional who provides a strong educational experience to 2nd-grade students","NCgqMdHD");

    await user.createUser("Kate", "Gordon", 28, "cheff", "kate.gordon@gmail.com", "5660456566", 
    "Self-motivated Chef who leads by example.","AMEXxE4z");

    await user.createUser("Barbara", "Colins", 30, "musician", "barbara.colins@gmail.com", "1787831102", 
    "Proffecional pianist with over 7 years of experience","6yegXYzc");

}


(async() => {
    try {
        createRelationships(); 
        await sqInst.sync({force : true});
        await populateUser();
        await populateStartup();
        
        app.listen(process.env.PORT, () => {
            console.log(`Started server`);
        });
    } catch (error) {
        console.log(error)
    }
})();