class Login extends React.Component {

    state = {
        email: "abc@gmail.com",
        password: "password"
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleFormSubmit(e) {
        
    }

    render() {
        return (
            <div>
                <form onSubmit = {(e) => handleFormSubmit(e)}>
                </form>
            </div>
        );
    }

}