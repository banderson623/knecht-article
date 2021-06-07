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
    <div className="border-b-2 mb-10">
      <button
        style={{marginBottom: "-1.3rem"}}
        className="block m-auto rounded-full px-4 py-2 bg-white hover:bg-gray-200 border-2 border-gray-200 text-base" onClick={onClick}>
        {title} <span className="text-sm text-gray-400"> {Math.ceil(contentSize / 20)} seconds </span>
      </button>
    </div>
  )
}

const Paragraph = ({children, depth}) => {
  const [shown, setShown] = useState(false);

  let className = "leading-relaxed my-3 text-xl md:text-xl md:leading-loose"

  depth = depth || 'short'

  const Content = () => (<p className={className}>{children}</p>)

  if ( depth !== 'short' ) {
    return (<>
      {shown && <Content />}
      {!shown && <ReadMoreButton contentSize={children.toString().length} title="Dive Deeper" onClick={()=> {setShown(!shown)}}/>}
    </>)

  }

  return <Content />
}

const InDepthSelector = () => {
  const Container = ({children}) => (
    <div className="my-4 text-center md:max-w-xl mx-auto">
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
        <Option value="short" selected>The fastest way to read this article</Option>
        <Option value="medium">Next next level, dive a little deeper</Option>
        <Option value="long">You are probably a college professor</Option>
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
        </Section>
      </ArticleBody>
    </Article>
  )
}

export default App
