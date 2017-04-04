'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootscope, authService) {
  $log.debug('NavbarController');

  this.checkpath = function() {
    let path = $location.path();
    if (path === '/join') {
      this.hideButtons = true;
    }

    if (path !== '/join') {
      this.hidebuttons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#signup');
      })
    }
  };

  this.checkPath();

  $rootscope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('navbarCtrl.logout');
    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    })
  }
};
