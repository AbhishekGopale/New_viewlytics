const salaryModel = require('../../admin/models/salary')



exports.findSalary = async (reqBody) => {
    try{

        let salary = await salaryModel.findAll({
            where:{user_id:reqBody.user_id,year:reqBody.year,month:reqBody.month},
            attributes:['id','user_id','Amount','year','month','hra','basic','conveyance','cca','medical','allowances','arrears','prov_fund','esic','p_tax','tds','loan','salary_advance','vpf','lwf_ee','other_deduction','pf_column','pf_contribution','esic_column','esice_cont','pension_cont','esic_gross','esic_calc','p_tax_calc','admin_charges','edli_21','edli_22','edli_sal','pension_sal','monthly_gross','monthly_basic','monthly_hra','monthly_medical','monthly_conveyance','monthly_cca','lwf_ey','lwf_sal','lwf_earned_gross','lwf_flag','pf_flag','employee_name','employee_code','grade','branch','department','status','payment_mode','last_increment_on'],
            raw: true,
            nest: true
        })
        return salary;
    }catch(error){
        console.log(error)
    }
}


