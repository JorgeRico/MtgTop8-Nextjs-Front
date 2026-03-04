type MyComponentProps = {
    component : React.ReactNode;
    loading   : boolean;
};

const Breadcrumb: React.FC<MyComponentProps> = ({ component, loading }) => {
    return (
        <section className={`left w100 f14 ${loading === false ? 'blink blured' : ''}`}>
            {component}
        </section>
    );
}

export default Breadcrumb;