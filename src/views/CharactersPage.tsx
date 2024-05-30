import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries/Queries";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Row,
    Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface Character {
    id: string;
    name: string;
    image: string;
}

const CharactersPage = () => {
    const { loading, error, data } = useQuery(GET_CHARACTERS);

    if (loading)
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );

    if (error)
        return (
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error.message}</p>
            </Alert>
        );

    return (
        <Container>
            <h1>Characters List</h1>
            <Row>
                {data.characters.results.map(
                    ({ id, image, name }: Character) => (
                        <Col>
                            <Card key={id} style={{ width: "280px" }}>
                                <Card.Img variant="top" src={image} />
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Link to={`/${id}`}>
                                        <Button variant="primary">
                                            Go To Character
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                )}
            </Row>
        </Container>
    );
};

export default CharactersPage;
