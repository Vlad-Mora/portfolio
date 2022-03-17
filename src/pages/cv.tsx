import React from "react";
import { List } from "semantic-ui-react";

import Category from "@atoms/Category";

const CVPage = () => {
  return (
    <div className="cv-content">
      <div className="page-header">
        <div className="page-title">
          Junior Frontend Developer <span>- Vlad MORA</span>
        </div>
        <div className="lowered-position">
          <div className="contact-details">
            <span>Phone No.: +44 793 467 0614</span>
            <span>Email: vlad.mora.work@gmail.com</span>
          </div>
          <a
            className="portofolio"
            target="_blank"
            href="https://vm-portfolio.herokuapp.com/"
          >
            <u>My portofolio</u>
          </a>
        </div>
      </div>
      <div className="cv-description">
        <Category
          title="About myself"
          content={
            <>
              I am currently 16 and my birthday is on the 23
              <span className="superscript">rd</span> of October. I was born in
              Romania and moved to the United Kingdom in 2016. I am passionate
              about programming and building new things; as a hobby I like to
              cook or play video games. I am very hard working and determined to
              try new things as well as push myself out of my comfort zone.
            </>
          }
        />
        <Category
          title="Skills"
          content={
            <List bulleted animated selection className="skills">
              <List.Item>Hard working</List.Item>
              <List.Item>Determined</List.Item>
              <List.Item>Punctual</List.Item>
              <List.Item>Excellent communication</List.Item>
              <List.Item>Efficient</List.Item>
              <List.Item>Engaging</List.Item>
            </List>
          }
        />
        <Category
          title="Work experience"
          content={
            <List bulleted>
              <List.Item>
                <List.Header>Junior Python Developer</List.Header>
                <List.Description>
                  In year 8, I was introduced to coding using Python, which had
                  captured my interests in programming and my advanced thinking
                  skills. I became much more advanced at finding problems and
                  creating solutions for them. Along with the basics that I was
                  taught at school, I have taken my passion further and have
                  started to code at home in my spare time. I have begun
                  building a hiring system (
                  <a href="https://www.youtube.com/watch?v=Nzi3CFE16f4">
                    click to view
                  </a>
                  ) but have not finished it just yet. However, I have created
                  other projects like this Coin Counter which I built via school
                  requirements for my current GCSE course of Computer Science (
                  <a href="https://github.com/Vlad-Mora/Python/tree/main/Y11%20Project/CoinCounter-GUI">
                    click to view
                  </a>
                  ).
                </List.Description>
              </List.Item>
              <List.Item>
                <List.Header>
                  Junior Frontend Developer - Damage Inc (
                  <a href="https://drive.google.com/file/d/1wtUSUEH8qyJSayTFJZh78Um8pWomX_qK/view?usp=sharing">
                    recommendation letter
                  </a>
                  )
                </List.Header>
                <List.Description>
                  I have joined Damage Inc in June 2020 and soon got in contact
                  with the developer team. I have worked at Damage Inc for 14
                  months ( August 2020 - October 2021 ). At first, I have not
                  had any web developer experience thus helpe the team by
                  keeping connected with the community. My basic tasks would be
                  to make the contact ways between developers and the community
                  much easier and more efficient. I have redirected and
                  validated issues from members of the community towards our
                  developers. I have wanted to step up my game and once I got
                  used to the workflow, I have learned web development with the
                  help of my colleagues. In January 2021, I have started
                  implementing small features to our current applications when I
                  have been put in charge for the restructure / conversion of
                  one of our applications. The main task was to rewrite the
                  application from Javascript to Typescript, as this helped us
                  reduce logic error. With the help of my colleagues, I have
                  managed to get this task done in about 2 months and this has
                  helped me gain a lot of experience and knowledge. After that,
                  I have went back to helping with the release of new features.
                </List.Description>
              </List.Item>
              <List.Item>
                <List.Header>
                  Administrative Assistant - Damage Inc (
                  <a href="https://drive.google.com/drive/u/1/folders/1lSu4FDhyp6GOxK0wGQYRfBG4usLlfEvq">
                    click to view a few examples
                  </a>
                  )
                </List.Header>
                <List.Description>
                  Along with the Frontend Developer work I helped Damage Inc
                  with, I have also been asked to keep track of attendance for
                  several meetings, organise events and make other things that
                  made keeping track of much easier and neater. For example, in
                  Damage Inc's development team we had a day of the week where
                  we sat down together and played a game in order to relax from
                  all the hard work that has been done for the week. I
                  personally took responsability of managing what we called
                  "Game Night" in order to ensure a great experience for our
                  developers and being considerate of their mental health.
                </List.Description>
              </List.Item>
              <List.Item>
                <List.Header>
                  Junior Frontend Developer (continuation)
                </List.Header>
                <List.Description>
                  This work experience was probably the least productive yet I
                  am very proud of it. As I got closer to exams, I had to leave
                  Damage Inc and continue my journey in my programming career
                  alone although, this was not a regret. This has given me time
                  not only to focus on studies and achieve desired grades, but
                  also building my own personal website, which I decided to
                  convert into my portofolio (
                  <a href="https://github.com/Vlad-Mora/portofolio">
                    click to view
                  </a>
                  ). I am in love with web developing and the freedom you have
                  to do absolutely whatever you want.
                </List.Description>
              </List.Item>
            </List>
          }
        />
      </div>
    </div>
  );
};

export default CVPage;
