
import prisma from '../config/conn';

export async function createAnnualTax( district_id: number, taluka_id: number, grampanchayat_id: number,gat_grampanchayat_id: number,malmatteche_prakar_id: number,malmatteche_varnan_id: number,annual_rate: number,aakarani_dar: number) {
    let already_exist_id = await prisma.annual_tax.findMany({
        where: {
             district_id: {
                equals: district_id
            },
            taluka_id: {
                equals: taluka_id
            },
            grampanchayat_id: {
                equals: grampanchayat_id
            },
            gat_grampanchayat_id: {
                equals: gat_grampanchayat_id
            }
        },
         select: {
            id: true,
            is_delete: true
        }
         
    });
    // console.log("here",already_exist_id);

    if(already_exist_id.length > 0 && already_exist_id[0].is_delete == 1){
        await prisma.annual_tax.update({
            where: { id: already_exist_id[0].id },
            data: { is_delete: 0 },
            select: {
                id: true
            }
        })
    }
    if(already_exist_id.length > 0){
        return await prisma.annual_tax_additional.create({
            data: { annual_tax_id: already_exist_id[0].id, malmatteche_prakar_id, malmatteche_varnan_id, annual_rate, aakarani_dar }
        });
    }

    let createdAnnualTax = await prisma.annual_tax.create({
        data: { district_id, taluka_id, grampanchayat_id, gat_grampanchayat_id },
    });

    ;
    // console.log("id",createdAnnualTax.id);
     return await prisma.annual_tax_additional.create({
        data: { annual_tax_id: createdAnnualTax.id, malmatteche_prakar_id, malmatteche_varnan_id, annual_rate, aakarani_dar }
    });

}
// malmatteche_prakar_id, malmatteche_varnan_id,annual_rate,aakarani_dar

export async function getAllAnnualTax(params) {
    return await prisma.annual_tax.findMany({
        where: {
            ...(params.searchText && {
                OR: [
                    {
                        district: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    },
                    {
                        taluka: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    },
                    {
                        grampanchayat: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    },
                    {
                        gat_grampanchayat: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    }
                ]
                // ,
                // is_delete: 0
            })
        },
        take: params?.limit || 10,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        },
        include:{
            district:{
                select: {
                    id: true,
                    name: true
                }
            },
            taluka:{
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat:{
                select: {
                    id: true,
                    name: true
                }
            },
            gat_grampanchayat:{
                select: {
                    id: true,
                    name: true
                }
            },
           annual_tax_additional: {
                select: {
                    id: true,
                    annual_tax_id: true,
                    malmatteche_prakar_id: true,
                    malmatteche_varnan_id: true,
                    annual_rate: true,
                    aakarani_dar: true,
                    malmatta:{
                        select:{
                            id: true,
                            malmatteche_prakar_name: true
                        }
                    },
                    malmatteche_prakar:{
                        select:{
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });
}

export async function getAnnualTax(id: number) {
    const output = await prisma.annual_tax.findUnique({
        where: { id: id },
        include:{
            // Remove the 'select' property
            // Remove the 'tax_details' property
            // tax_details: true,
            // is_delete: true,
            district:{
                select: {
                    id: true,
                    name: true
                }
            },
            taluka:{
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat:{
                select: {
                    id: true,
                    name: true
                }
            },
            gat_grampanchayat:{
                select: {
                    id: true,
                    name: true
                }
            },
            annual_tax_additional: {
                select: {
                    id: true,
                    annual_tax_id: true,
                    malmatteche_prakar_id: true,
                    malmatteche_varnan_id: true,
                    annual_rate: true,
                    aakarani_dar: true,
                    malmatta:{
                        select:{
                            id: true,
                            malmatteche_prakar_name: true
                        }
                    },
                    malmatteche_prakar:{
                        select:{
                            id: true,
                            name: true
                        }
                    }
                },
                
            }
        }
    });
    return output;
}

export async function updateAnnualTax(id: number, data: { annual_rate?: number; aakarani_dar?: number }) {  
    const result = await prisma.annual_tax_additional.update({
        where: { id: id },
        data,
        select: {
            id: true,
            annual_tax_id: true,
            malmatteche_prakar_id: true,
            malmatteche_varnan_id: true,
            annual_rate: true,
            aakarani_dar: true,
            is_delete: true,
            malmatta:{
                select:{
                    id: true,
                    malmatteche_prakar_name: true
                }
            },
            malmatteche_prakar:{
                select:{
                    id: true,
                    name: true
                }
            } 
        }
    });
    return result;
}

export async function deleteAnnualTax(id: number) {
    const result = await prisma.annual_tax.update({
        where: { id: id },
        data:{is_delete:1},
        select: {
            id: true,
            district_id: true,
            taluka_id: true,
            grampanchayat_id: true,
            gat_grampanchayat_id: true,
            is_delete: true,
            district: {
                select: {
                    id: true,
                    name: true
                }
            },
            taluka: {
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            },
            annual_tax_additional: {
                select: {
                    id: true,
                    annual_tax_id: true,
                    malmatteche_prakar_id: true,
                    malmatteche_varnan_id: true,
                    annual_rate: true,
                    aakarani_dar: true,
                    malmatta:{
                        select:{
                            id: true,
                            malmatteche_prakar_name: true
                        }
                    },
                    malmatteche_prakar:{
                        select:{
                            id: true,
                            name: true
                        }
                    }
                },
                
            }
        }
    });
    return result;
}

export async function getAnnualTaxCount() {
    const count = await prisma.othertax.count();
    return count;
}

export async function findAnnualTax(params) {
    let ids = await prisma.annual_tax.findMany({
        where: {
            ...(params.d_id && {
                district_id: params.d_id
            }),
            ...(params.t_id && {
                taluka_id: params.t_id
            }),
            ...(params.g_id && {
                grampanchayat_id: params.g_id
            }),
            ...(params.gat_gid && {
                gat_grampanchayat_id: params.gat_gid
            })
        },
        select: {
            id: true
        }
    });
    // console.log("ids",ids);
    if(ids.length == 0){
        return [];
    }
    return await prisma.annual_tax_additional.findMany({
        where: {
            annual_tax_id: {
                equals: ids[0].id
            },
            ...(params.m_p_id && {
                malmatteche_prakar_id: params.m_p_id
            }),
            ...(params.m_v_id && {
                malmatteche_varnan_id: params.m_v_id
            })
        }
    })
}
 

export async function deleteAnnualTaxRates(id: number) {
    const output =await prisma.annual_tax_additional.update({
        where: { id: id },
        data: { is_delete: 1 },
        select: {
            id: true,
            annual_tax_id: true,
            malmatteche_prakar_id: true,
            malmatteche_varnan_id: true,
            annual_rate: true,
            aakarani_dar: true,
            is_delete: true,
            malmatta:{
                select:{
                    id: true,
                    malmatteche_prakar_name: true
                }
            },
            malmatteche_prakar:{
                select:{
                    id: true,
                    name: true
                }
            } 
        }
    });
    return output;
}

export async function getAnnualTaxRate(id: number) {
    const output = await prisma.annual_tax_additional.findUnique({
        where: { id: id }
    });
    return output;
}