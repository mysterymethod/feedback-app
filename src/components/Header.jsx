import PropTypes from 'prop-types'

function Header({text, bgColor, textColor}) {

    const headerStyle = {
        backgroundColor: bgColor,
        color: textColor,
    }

    return (
        <header style={headerStyle}>
            <div className="container">
                <h1>Feedback UI</h1>
            </div>
        </header>
    )
}

Header.defaultProps = {
    text: 'This is default Props',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propsTypes = {
    text: PropTypes.string,
}

export default Header
