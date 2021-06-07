import React, { useState } from 'react'
import {InfoIcon} from './components/Icons.jsx'
import './App.css'

const Article = ({children}) => {
  return (
    <article className="mx-4 md:max-w-3xl md:m-auto">{children}</article>
  )
}

const ArticleTitle = ({children}) => {
  return (
    <h1 className="text-6xl md:text-8xl mt-12 text-green-600 font-headline">
      {children}
    </h1>
  )
}

const ByLine = ({authors}) => {
  const Author = ({children}) => (<span className="">{children}</span>)
  const AuthorJoin = () => (<span className="text-gray-300">|</span>)

  const authorElements = authors.map(name => {
    return <Author key={name}>{name}</Author>
  })

  return (<div className="font-headline">by {authorElements}</div>)
}

const ArticleBody = ({children}) => {
  return (
    <div className="font-body">
      {children}
    </div>
  )
}

const Section = ({children}) => {
  return (<section>{children}</section>)
}

const Header = ({children}) => {
  return (
    <h1 className="font-bold text-3xl mt-12">{children}</h1>
  )
}

const ReadMoreButton = ({title, onClick, contentSize}) => {
  return (
    <div className="flex mb-6 border-b-2 opacity-50 hover:opacity-100 justify-center"
         onClick={onClick}
         style={{
          //  backgroundImage: "linear-gradient(135deg, #ccc 50%, transparent 50%),linear-gradient(225deg, #ccc 50%, transparent 50%)",
          //  backroundPosition: "top left, top left",
          //  backgroundSize: "12px 12px",
          //  backgroundRepeat: "repeat-x"
         }}>
      <button
        style={{marginBottom: "-1.2rem"}}
        className="rounded-full px-4 py-1 bg-white hover:bg-gray-200 border-2 border-gray-200 text-base">
        {title} <span className="text-sm ml-4 text-gray-400"> {Math.ceil(contentSize / 15)} seconds </span>
      </button>
    </div>
  )
}

const Paragraph = ({children, depth}) => {
  const [shown, setShown] = useState(false);

  depth = depth || 'short'

  let className = "leading-relaxed my-3 text-xl md:text-xl md:leading-loose"

  if(depth !== 'short') className += " pl-2 -ml-4 border-l-8 "
  if(depth == 'medium') className += " border-green-300"
  if(depth == 'long') className += " border-blue-300"

  const Content = () => (<p className={className}>{children}</p>)

  if ( depth !== 'short' ) {
    return (<>
      {shown && <Content />}
      {!shown && <ReadMoreButton contentSize={children.toString().length} title="Dive Deeper" onClick={()=> {setShown(!shown)}}/>}
    </>)

  }

  return <Content />
}

const P = Paragraph;

const InDepthSelector = () => {
  const Container = ({children}) => (
    <div className="md:my-4 p-4 -mx-4 md:mx-auto text-center md:max-w-xl mx-auto shadow-lg md:rounded-lg ">
      {children}
    </div>
  )

  const Option = ({value, selected, children}) => {
    let className = "mr-1 bg-white rounded px-4 py-2 inline-block hover:bg-gray-100"

    if(selected) className += " bg-green-100 hover:bg-green-100"

    let readTime = 4
    if (value == "medium") readTime = 6
    if (value == "long") readTime = 12

    return (
      <div className={className}>
        <p className="text-lg font-bold capitalize">{value}</p>
        <p className="text-sm mt-2 text-gray-700">{children}</p>
        <p className="text-gray-400 mt-2 text-sm">{readTime} minute read</p>
      </div>
    )
  }

  return (
    <Container>
      <div className="p-2">
        <span className="mr-2 text-gray-700">Content Depth Selection</span>
        <InfoIcon className="inline-block text-gray-600"/>
      </div>
      <div className="flex">
        <Option value="short" selected>Concise and to the point</Option>
        <Option value="medium">Round out your knowledge</Option>
        <Option value="long">The background & quirks</Option>
      </div>
    </Container>
  )
}

function App() {
  return (
    <Article>
      <InDepthSelector />
      <ArticleTitle>Electoral College</ArticleTitle>
      <ByLine authors={['Dr. Thomas Knecht']} />

      <ArticleBody>
        <Section>
          <Header>Introduction</Header>
          <Paragraph>The Electoral College is the duck-billed platypus of electoral institutions: there is nothing like it world.  But is America’s unique, duck-billed way of electing the President of the United States a strength or weakness?  Before we get to that debate, here’s what you need to know about the Electoral College.</Paragraph>
        </Section>
        <Section>
          <Header>What you need to know</Header>

          <Paragraph>Americans elect their president through the Electoral College, not by a nationwide popular vote.</Paragraph>
          <Paragraph>States are the most important players in the Electoral College system.  Each state receives a number of Electoral Votes equal to their number of representatives to the U.S. House plus two senators (all states have two senators).</Paragraph>

          <Paragraph depth="medium">For example, California, the nation’s largest state by population, has 53 House members and two senators, giving it 55 Electoral Votes.  At the other end of the scale, Wyoming, the nation’s smallest state, has one House representative and two senators for a total of three Electoral Votes.  A common mistake is to say that population determines how many electoral votes a state gets.
            <Paragraph depth="long">Larger states do get more electoral votes, but, because the U.S. Senate is the most malapportioned legislature in the world, there is not a one-to-one ratio between population and Electoral Votes.  Let’s use the example of California and Wyoming.  The website 270towin.com estimated that California gets one electoral vote for every 680,000 people, while Wyoming gets one per 190,000.</Paragraph>
          </Paragraph>
          <Paragraph>States decide how to allocate their electoral votes.  Most states choose a winner-take-all system, where the candidate who gets the most votes in that state gets all the Electoral Votes.</Paragraph>
          <Paragraph depth="medium">Consider Arizona in the 2020 Presidential Election.  Biden narrowly beat Trump 1,672,143 votes (49.4%) to 1,661,686 (49.0%).  But despite winning by just 10,457 votes, Joe Biden received all of Arizona’s 11 Electoral Votes, and Trump received none.
            <Paragraph depth="long">This discrepancy is what political scientists call a mechanical electoral bias.  Two states—Maine and Nebraska—employ the “congressional district method.”  Both states give two electoral votes to the candidate who received the most votes in that state.  But, and here is where we get the “congressional district” part of the equation, candidates receive one electoral vote for each congressional district they win (Maine has two congressional districts, and Nebraska has three).  As a result, Maine and Nebraska can, and often do, split their electoral votes.  For instance, in the 2020 Presidential Election, Donald Trump won four Electoral Votes in Nebraska, and Biden won one; in Maine, Biden won three Electoral Votes and Trump one. </Paragraph>
          </Paragraph>

          <Paragraph>A candidate needs 270 out of 538 Electoral Votes to win the presidency.</Paragraph>
          <Paragraph depth="medium">A sharp-eyed observer might note that there are 538 Electoral Votes but only 535 Members of Congress.  What gives?  The extra three votes are for citizens of Washington D.C., who can vote in presidential, but not congressional, elections.
            <Paragraph depth="long">There is also talk about admitting Puerto Rico as the 51st state.  If that happens, Puerto Rico would likely have seven Electoral Votes, which would mean future presidents would have to win 273 of the 545 total Electoral Votes.</Paragraph>
          </Paragraph>

          <Paragraph>If no candidate receives 270 Electoral Votes, the House of Representatives elects the next president.  </Paragraph>
          <Paragraph depth="medium">In this scenario, each state’s delegation gets a single vote.  For instance, all of California’s 53 representatives would deliberate and cast one vote for president.  The candidate who received a majority of states’ votes (26/50) becomes president.  Although America’s two-party system means that the House rarely chooses the president, it has happened twice: in 1800 and 1824.

            <Paragraph depth="long">And it is certainly possible that the U.S. House might elect a future president if a popular third-party candidate came along and siphoned off votes from the two major-party candidates.  The likelihood of a third-party candidate stealing votes and sending the election to the House increases if the candidate has strong regional support, like George Wallace in 1968.  </Paragraph>
          </Paragraph>
        </Section>
      </ArticleBody>
    </Article>
  )
}

export default App
