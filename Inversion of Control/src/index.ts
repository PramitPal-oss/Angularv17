class LoggerMethod {

  constructor(private name: string, private age: number, private dept: string) { }

  log() {
    console.log(`${this.name} has joined ${this.dept} at the age of ${this.age}. Wish him a good luck and warm welcome for the company!!`)
  }
}

// Inversion of control.
class AppliedMethod {

  constructor(private company: string, private position: string) { }

  loggerApplied = new LoggerMethod('Pramit Pal', 28, 'IT') // !BAD Practise!! NOT RECOMENDED AT ALL!!
  // In this secnireo the AppliedMethod is tightly coupled with logger method and sligthly changed in logger method can be probmlatic there.

  loggedFromHere() {
    this.loggerApplied.log()
    console.log(`Thanks for joining in ${this.company} as a ${this.position}!!`)
  }

}

const aplliedclasses = new AppliedMethod('TRP Global', 'Developer')

aplliedclasses.loggedFromHere()


class PerfectUseCase {
  constructor(private hobby: string, private education: string, private loggerMethod: LoggerMethod) { } // Correct way of usage

  loggedPerfect() {
    this.loggerMethod.log();
    console.log(`My ${this.hobby} is fucked up after joining here!!. Though I am a ${this.education}.`)
  }
}

const instanceLogger = new LoggerMethod('Amit Pal', 25, 'Security')
const perfectmethod = new PerfectUseCase('Cricket', 'Electrical Engineer', instanceLogger)

perfectmethod.loggedPerfect()