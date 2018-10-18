# Register new Applications

`isabl` platform is agnostic of the applications you run to perform analysis to your data. In a sense that you can register any application that is accessible to run in your system, and configure `isabl-cli` to run it and track every time the application is run on the samples.

With `isabl-cli`, applications can be run seamlessly for projects and cohorts of samples with simple commands. And `isabl` will take care of:

- validating that the requirements are met to run the analysis.
- creating unique output folders for each unique analyses.
- submitting the analyses as jobs to a batch system, like LSF.
- track the status of each job.
- create automate workflows to trigger different functions or analysis after status changes.

## Analysis Execution

One of `isabl` main features, is that it avoids that analyses that are already done succesfully to specific samples can be run again by non-admin users. Ensuring that the system resources are wasted innecesarily.

For these, `isabl` defines the uniqueness of an `analysis` by an unique `application` run in an unique list of **targets** and **references**.

And the uniqueness of an application depends on 4 fields:

- **application** name
- **version** of the application
- genome **assembly**
- genome **species**
