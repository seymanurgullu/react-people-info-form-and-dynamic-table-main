function ShowList(props) {
    const {removePerson} = props;
    return (
        props.people.map((person) => (
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.surname}</td>
                <td>{person.mail}</td>
                <td>
                    <button onClick={() => removePerson(person.id)}>Delete</button>
                </td>
            </tr>
        ))
    );
}

export default ShowList;