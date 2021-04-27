const LoadDiageoHorizon = () => {
  const bodyTag = document.querySelector('body');

  const jqueryScript = document.createElement('script');
  jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';
  jqueryScript.defer = true;
  jqueryScript.crossorigin = 'anonymous';
  bodyTag.appendChild(jqueryScript);
  function deferUntilJquery(method) {
    if (window.$) {
      method();
    } else {
      setTimeout(() => { deferUntilJquery(method); }, 50);
    }
  }

  const jqueryMigrateScript = document.createElement('script');
  jqueryMigrateScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.3.1/jquery-migrate.min.js';
  jqueryMigrateScript.defer = true;
  jqueryMigrateScript.crossorigin = 'anonymous';
  const appendJqueryMigrate = function () {
    bodyTag.appendChild(jqueryMigrateScript);
  };
  deferUntilJquery(appendJqueryMigrate);

  const diageohorizonScript = document.createElement('script');
  diageohorizonScript.src = 'https://footer.diageohorizon.com/dfs/master.js';
  diageohorizonScript.defer = true;
  diageohorizonScript.crossorigin = 'anonymous';
  const appendHorizonMaster = function () {
    bodyTag.appendChild(diageohorizonScript);
  };
  deferUntilJquery(appendHorizonMaster);
};

export default LoadDiageoHorizon;
