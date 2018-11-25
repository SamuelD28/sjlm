GenerateSubmitButton = (btnText, btnClassStyle) =>
    {
        return (
        <Form.Field>
            <button type="submit" className={btnClassStyle}>
                {btnText}
            </button>
        </Form.Field>
        )
    }