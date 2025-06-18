import React from 'react'
import { Badge, Container, Header, Subtitle,Title } from '../../CommonStyles'

const KickedOutPage = () => {
  return (
    <Container>
      <Badge>✨ Intervue Poll</Badge>
      <Header>
            <Title>
                You've been Kicked out !
            </Title>
            <Subtitle>
                Looks like the teacher had removed you from the poll system. 
                <br/>Please Try gain sometime.
            </Subtitle>
        </Header>
    </Container>
  )
}

export default KickedOutPage