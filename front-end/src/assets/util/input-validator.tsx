export class InputValidator {
    checkNickname = (nickname: string) => {
      const regExp = /^([a-zA-Z0-9ㄱ-ㅎ |ㅏ-ㅣ|가-힣]){1,15}$/;

      if (regExp.test(nickname)) {
        return true;
      }
      return false;
    }
}

export default new InputValidator();
