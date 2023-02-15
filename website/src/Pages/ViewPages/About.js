import { Box } from "@mui/material";
import CarouselContainer from "../../Components/Layout/Carousel";
import { Avatar } from "@mui/material";
import ContactForm from "../../Components/Forms/ContactForm";
const About = (props) => {
    return <Box key='1' sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem', textAlign: 'left' } }} >
        <section id="contact-us">
            <h4>Contact us</h4>
            <hr />
            <ContactForm />
        </section>
        <br />
        <section id="about-us">
            <h4>About us</h4>
            <hr />
            {/* <p>{`Donation total: $${props.donations}`}</p> This will be added when dashboard is done*/}
            <p className="about">SPFA is a series of tournaments run by Awareness Athletics Inc. Our goals are to raise Autism awareness by spending some time at each tournament talking about Autism to the participants, to raise understanding by educating people
                on the facts of Autism and to hopefully help people with Autism gain acceptance.
                After that the next goal is to raise funds for families. To do that we take donations. Every dollar donated goes directly to assist a person with Autism. On top of that, we top up that number from our profits.
                We do not want to give the perception that we are charity tournaments. We are not. What we are though, is a business that is doing what we can to help families of Autism.</p>
            <p className="about">Although we are not parents of Autistic children, we had many friends that were and saw the rate of growth within North America. At our first tournament in 2011 the Autism rate was 1 in 144. By 2018 that has grown to 1 in 54 and
                1 in 42 in boys. Autism is the fastest growing disorder in North America as well as the most under-funded.
                We ran our first tournament in Belleville in 2011 for a local Autism charity called Adam's Hope. It was successful enough that we decided to try again next year and it grew. The following year we took the tournament to Milton
                and did that tournament for Kerry's Place Autism Services. In 2014 we added Kingston and supported
                Kingston 4 Paws. This was the year that we knew we were really doing some good.</p>

            <p className="about">2015 started a new chapter for us. In the beginning we knew that we had to work with charities to build our
                credibility but we always wanted to find ways to donate directly to families. In 2015 we started offering teams the
                option to represent a family of Autism. From each tournament a family would be drawn to receive a donation. We added tournaments in Guelph, Barrie and Cobourg. By the end of this year we were ready to expand a lot.
                In 2016 we hosted 17 tournaments and in 2017 45 tournaments. We decided that every family represented would go on our donation wait list.</p>

            <p className="about">The response has been staggering. Each family represented receives $500. </p>
            <p className="about">Our tournaments are more than just a ball tourney. We have time blocked off to speak with the participants. This is the time that we give away prizes, but more
                importantly, we speak to the crowd about Autism and why we are there. We often have people with Autism
                or family members speak at this time. This is the time that the participants really get to understand the
                impact of what we are doing. It is, to us, the most important time of the tournament.
                We look forward to seeing you at a SPFA event near you!</p>
            <br />
        </section>
        <br />
        <section id="team">
            <h4>Meet the team</h4>
            <CarouselContainer arrows={true}>
                {props.team.map((member) => {
                    const array = member.assets.profileImage.split('/');
                    const name = array[1];
                    const location = array[0];
                    return <Box key={member._id} sx={{width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{ width: 150, height: 150 }} alt={`${member.details.name.givenName} ${member.details.name.familyName}`} src={`/${location}/${name}/500/${name}.png`} />
                        <h5 style={{marginTop: '1rem'}}>{`${member.details.name.givenName} ${member.details.name.familyName}`}</h5>
                    </Box>
                })}
            </CarouselContainer>
            <hr />
        </section>
        <br />
        <section id="code-of-conduct">
            <h4>Our code of conduct</h4>
            <hr />
            <p className="about">Our code of conduct applies to all employees of Awareness Athletics Inc., all conveners, umpires or volunteers associated with the operation of SPFA tournaments, as well as all players in any SPFA tournament or event.</p>
            <p className="about">All of the above will treat others with respect and dignity. Actions such as racism, homophobia, harassment or any form of bullying will not be tolerated.</p>
            <p className="about">Any breach of this code of conduct will be considered as conduct unbecoming. Each case will be dealt with individually and appropriate actions will be taken.</p>
        </section>
    </Box>
}
export default About;