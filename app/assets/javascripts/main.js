var app = angular.module('quiz', []);

  app.controller('QuizCtrl', function($scope, $http){
    $scope.currentQuizId = 1;
    $scope.currentQuestion = {};
    $scope.formData = {};
    $scope.answerStatus = {};

    $scope.getFirstQuizId = function(){
      var self = this;
      $http.get('/quizzes.json').success(function(data){
        console.log(data.quizzes[0].quiz_id);
        self.currentQuizId = data.quizzes[0].quiz_id;
      });
    }

    $scope.getNextQuestion = function(){
      var self = this;
      $http({
        url: '/quizzes/' + this.currentQuizId + '/questions/next.json',
        method: 'GET',
        params: {session_key: sessionId}
      }).success(function(data){
        $scope.currentQuestion = data.question;
      });
    };

    var getSession = function(){
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( var i=0; i < 5; i++ )
              text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
      }

    $scope.getFirstQuizId();
    var sessionId = getSession();
    console.log(sessionId);
    $scope.getNextQuestion();

    $scope.submitAnswer = function(answer){
        $http({
        url: '/questions/' + this.currentQuestion.question_id + '/answers.json',
        method: 'POST',
        params: {
          session_key: sessionId,
          choice_id: answer
        }
      }).success(function(data){
        $scope.answerStatus[$scope.currentQuestion.question_id] = data.status.correct
        $scope.getNextQuestion();
      });
    }
  });


