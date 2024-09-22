
const LoadingPage = () => {
    return (
      <>
        <div className="fixed-background-loading" />
        <main>
          <div className="container container-loading loading-page">
            <div className="row h-100">
              <div className="col-12 col-md-10 mx-auto my-auto">
                <div className="d-flex flex-column justify-content-center align-items-center card">
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  };
  
  export default LoadingPage;