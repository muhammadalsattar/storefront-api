import { SpecReporter as JasmineSpecReporter } from 'jasmine-spec-reporter'

jasmine.getEnv().clearReporters() // remove default reporter logs
jasmine.getEnv().addReporter(
  new JasmineSpecReporter({
    // add jasmine-spec-reporter
    spec: {
      displayPending: true,
    },
  })
)