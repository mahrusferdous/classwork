import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../queries/Queries";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

interface Episodes {
    name: string;
    episode: string;
}

const CharacterPage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id: id },
    });

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

    const { name, image, episode } = data.character;

    return (
        <div>
            <Card key={id} style={{ width: "280px" }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Link to="/">
                        <Button variant="primary">Go to All Characters</Button>
                    </Link>

                    <h2>Featured Episodes</h2>
                    {episode.map(({ episode, name }: Episodes) => (
                        <p>
                            {name} {episode}
                        </p>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CharacterPage;
