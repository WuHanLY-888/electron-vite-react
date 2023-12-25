import { Button } from 'antd'

// type RootState = ReturnType<typeof store.getState>;

const View = () => {
    const changeNum = () => {
        console.log('hello')
    }

    return (
        <div>
            <p>about</p>

            <Button type="primary" onClick={changeNum}>
                按钮
            </Button>
        </div>
    )
}

export default View
